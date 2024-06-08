import { types, Instance, SnapshotIn } from "mobx-state-tree"

import { makePlainNumberModel } from "models/primitives/Number"

export interface ITwoSidedRange
extends Instance<ReturnType<typeof makeTwoSidedRangeModel>> {}
export interface ITwoSidedRangeSnapshotIn
extends SnapshotIn<ReturnType<typeof makeTwoSidedRangeModel>> {}

export const makeTwoSidedRangeModel = (
	type: "int" | "float",
	min: number,
	max: number,
) => {
	return types
		.model("Complex::Ranges.TwoSided", {
			start: makePlainNumberModel(type, min),
			end: makePlainNumberModel(type, undefined, max)
		})
		.views(self => {
			return {
				get turple(): Turple {
					return [
						self.start.numeric,
						self.end.numeric,
					]
				}
			}
		})
}