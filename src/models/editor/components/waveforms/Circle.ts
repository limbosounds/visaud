import { reaction } from "mobx"
import { types, Instance, SnapshotIn, addDisposer } from "mobx-state-tree"

import Scene from "stores/Scene"

import { ComponentDimensionsModel, renderBounds } from "../Basic"
import { ColorModel } from "models/primitives/Color"
import { makeRodedNumberModel } from "models/primitives/roded/Number"
import { makePlainNumberModel } from "models/primitives/Number"
import Processor from "stores/Sound/Processor"

export interface ICWaveformCircle
extends Instance<typeof CWaveformCircleModel> {}
export interface ICWaveformCircleSnapshotIn
extends SnapshotIn<typeof CWaveformCircleModel> {}

export const CWaveformCircleModel = types
	.model("Component::Waveform.Circle", {
		id: types.identifier,
		type: types.literal("waveform:circle"),
		dimensions: ComponentDimensionsModel,
		color: ColorModel,
		weight: makeRodedNumberModel("int", 1, 100),
		thickness: makePlainNumberModel("int", 2),
	})
	.views(self => {
		return {
			get r(): number {
				return self.dimensions.width.numeric / 2
			},
		}
	})
	.actions(self => {
		return {
			render: (
				context: CanvasRenderingContext2D,
				bufferLength: number,
				isHighlighted: boolean,
			) => {
				const { waveform } = Processor

				context.save()

				context.lineWidth = self.weight.roded
				context.lineJoin = "round"
				context.strokeStyle = self.color.rgba
				context.beginPath()

				const angle = Math.PI * 2 / bufferLength
				const { x: cx, y: cy } = self.dimensions
				context.moveTo(cx.numeric, self.dimensions.top)

				for (let i = 0; i < bufferLength; i++) {
					const cr = self.r + waveform[i] * self.thickness.numeric
					const ca = -Math.PI / 2 - angle * i
					const x = cx.numeric + cr * Math.cos(ca)
					const y = cy.numeric + cr * Math.sin(ca)
					context.lineTo(x, y)
				}

				context.lineTo(cx.numeric, self.dimensions.top)
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
				self.dimensions.anchoring.setByNumeric(4)
				addDisposer(self, reaction(
					() => self.weight.numeric,
					() => Scene.updateFrame()
				))
				addDisposer(self, reaction(
					() => self.thickness.numeric,
					() => Scene.updateFrame()
				))
			}
		}
	})