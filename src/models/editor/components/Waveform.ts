import { types, Instance, SnapshotIn, addDisposer } from "mobx-state-tree"

import SoundProcessor from "stores/Sound/Processor"

import { ComponentDimensionsModel, renderBounds } from "./Basic"
import { ColorModel } from "models/primitives/Color"
import { makeRodedNumberModel } from "models/primitives/roded/Number"
import { reaction } from "mobx"
import Scene from "stores/Scene"

export interface ICWaveform
extends Instance<typeof CWaveformModel> {}
export interface ICWaveformSnapshotIn
extends SnapshotIn<typeof CWaveformModel> {}

export const CWaveformModel = types
	.model("Component::Waveform", {
		id: types.identifier,
		type: types.literal("waveform"),
		dimensions: ComponentDimensionsModel,
		color: ColorModel,
		weight: makeRodedNumberModel("int", 1, 100)
	})
	.actions(self => {
		return {
			render: (
				context: CanvasRenderingContext2D,
				bufferLength: number,
				isHighlighted: boolean,
			) => {
				const { waveform } = SoundProcessor
				const width = self.dimensions.width.numeric
				const height = self.dimensions.height.numeric
				const halfHeight = height / 2

				context.save()

				context.lineWidth = self.weight.roded
				context.lineJoin = "round"
				context.strokeStyle = self.color.rgba
				context.beginPath()

				const sliceWidth = width / bufferLength
				let x = self.dimensions.left
				for (let i = 0; i < bufferLength; i++) {
					const v = waveform[i] * halfHeight
					const y = self.dimensions.top + halfHeight + v
					if (i == 0)
						context.moveTo(x, y)
					else
						context.lineTo(x, y)
					x += sliceWidth
				}

				context.lineTo(self.dimensions.left + width, self.dimensions.top + halfHeight)
				context.stroke()

				context.restore()

				if (isHighlighted)
					renderBounds(context, self.dimensions)
			}
		}
	})
	.actions(self => {
		return {
			afterCreate: () => {
				addDisposer(self, reaction(
					() => self.weight.numeric,
					() => Scene.updateFrame()
				))
			}
		}
	})