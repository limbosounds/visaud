import { reaction } from "mobx"
import { types, Instance, SnapshotIn, addDisposer } from "mobx-state-tree"

import Scene from "stores/Scene"
import SoundProcessor from "stores/Sound/Processor"

import { ComponentDimensionsModel, renderBounds } from "../Basic"
import { ColorModel } from "models/primitives/Color"
import { makeRodedNumberModel } from "models/primitives/roded/Number"

export interface ICWaveformBasic
extends Instance<typeof CWaveformBasicModel> {}
export interface ICWaveformBasicSnapshotIn
extends SnapshotIn<typeof CWaveformBasicModel> {}

export const CWaveformBasicModel = types
	.model("Component::Waveform.Basic", {
		id: types.identifier,
		type: types.literal("waveform:basic"),
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
				context.moveTo(x, self.dimensions.top + halfHeight)
				for (let i = 0; i < bufferLength; i++) {
					const v = waveform[i] * halfHeight
					const y = self.dimensions.top + halfHeight + v
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