import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { ComponentDimensionsModel, renderBounds } from "../Basic"
import { makePlainNumberModel } from "models/primitives/Number"
import Processor from "stores/Sound/Processor"

export interface ICFreqBasic
extends Instance<typeof CFreqBasicModel> {}
export interface ICFreqBasicSnapshotIn
extends SnapshotIn<typeof CFreqBasicModel> {}

export const CFreqBasicModel = types
	.model("Component::Freq.Basic", {
		id: types.identifier,
		type: types.literal("freq:basic"),
		dimensions: ComponentDimensionsModel,
		count: makePlainNumberModel("int", 128, 1024),
	})
	.actions(self => {
		return {
			render: (
				context: CanvasRenderingContext2D,
				bufferLength: number,
				isHighlighted: boolean,
			) => {
				const { freq } = Processor
				const audibleLength = bufferLength / 2

				context.save()
				context.fillStyle = "white"
				const { width, height, top, left } = self.dimensions
				const rw = width.numeric / audibleLength

				for (let i = 0; i < audibleLength; i++) {
					const rh = height.numeric * (freq[i] / 255)
					context.fillRect(
						left + rw * i,
						top + height.numeric - rh,
						rw,
						rh
					)
				}
				context.restore()

				if (isHighlighted)
						renderBounds(context, self.dimensions)
			}
		}
	})