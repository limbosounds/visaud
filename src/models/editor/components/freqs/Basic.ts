import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { ComponentDimensionsModel, renderBounds } from "../Basic"
import { makePlainNumberModel } from "models/primitives/Number"
import Processor from "stores/Sound/Processor"
import { makeTwoSidedRangeModel } from "models/complex/ranges/TwoSide"

export interface ICFreqBasic
extends Instance<typeof CFreqBasicModel> {}
export interface ICFreqBasicSnapshotIn
extends SnapshotIn<typeof CFreqBasicModel> {}

export const CFreqBasicModel = types
	.model("Component::Freq.Basic", {
		id: types.identifier,
		type: types.literal("freq:basic"),
		dimensions: ComponentDimensionsModel,
		freqRange: types.optional(
			makeTwoSidedRangeModel("float", 20, 20000),
			{
				start: { value: "20" },
				end: { value: "1000" },
			}
		),
		count: types.optional(
			makePlainNumberModel("int", 128),
			() => ({
				value: Processor.analyser.frequencyBinCount.toString(),
			})
		),
	})
	.actions(self => {
		return {
			render: (
				context: CanvasRenderingContext2D,
				bufferLength: number,
				isHighlighted: boolean,
			) => {
				const { width, height, top, left } = self.dimensions
				const rw = width.numeric / self.count.numeric

				context.save()
				Processor.strictedFreqRange(
					bufferLength,
					self.freqRange.turple,
					self.count.numeric
				).forEach((value, i) => {
					const rel = value / 255
					context.fillStyle = `rgba(255, 255, 255, ${rel})`
					const rh = height.numeric * (value / 255)
					context.fillRect(
						left + rw * i,
						top + height.numeric - rh,
						rw,
						rh
					)
				})

				context.restore()

				if (isHighlighted)
					renderBounds(context, self.dimensions)
			}
		}
	})
	.actions(self => {
		return {
			afterCreate: () => {
				self.count.max = Processor.analyser.frequencyBinCount
			}
		}
	})