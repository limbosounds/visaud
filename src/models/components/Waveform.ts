import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { v4 as uuid } from "uuid"

import SoundProcessor from "stores/SoundProcessor"

import { ComponentDimensionsModel, renderBounds } from "./Basic"
import { ColorModel } from "models/primitives/Color"
import { makeNumberModel } from "models/primitives/Number"

export interface ICWaveform
extends Instance<typeof CWaveformModel> {}
export interface ICWaveformSnapshotIn
extends SnapshotIn<typeof CWaveformModel> {}

export const CWaveformModel = types
	.model("Component::Waveform", {
		id: types.optional(types.string, () => uuid()),
		type: types.literal("waveform"),
		dimensions: ComponentDimensionsModel,
		color: ColorModel,
		heaviness: makeNumberModel("int", 1)
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

				context.lineWidth = self.heaviness.numeric
				context.strokeStyle = self.color.rgba
				context.beginPath()

				const sliceWidth = width / bufferLength
				let x = self.dimensions.left.numeric
				for (let i = 0; i < bufferLength; i++) {
					const v = waveform[i] * halfHeight
					const y = self.dimensions.top.numeric + halfHeight + v
					if (i == 0)
						context.moveTo(x, y)
					else
						context.lineTo(x, y)
					x += sliceWidth
				}

				context.lineTo(width, halfHeight)
				context.stroke()

				if (isHighlighted)
					renderBounds(context, self.dimensions)
			}
		}
	})