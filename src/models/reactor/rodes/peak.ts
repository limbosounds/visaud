import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { makeNumberModel } from "models/primitives/Number"
import Processor from "stores/Sound/Processor"
import { v4 as uuid } from "uuid"

export interface IPeakRode
extends Instance<typeof PeakRodeModel> {}
export interface IPeakRodeSnapshotIn
extends SnapshotIn<typeof PeakRodeModel> {}

export const PeakRodeModel = types
	.model("Rodes::Peak", {
		id: types.optional(types.string, uuid),
		type: types.literal("peak"),
		spread: makeNumberModel("float", -100, 100),
	})
	.views(self => {
		return {
			getSpreadLimit: (
				min: number,
				max: number,
			) => {
				return (max - min) * (self.spread.numeric / 100)
			}
		}
	})
	.views(self => {
		return {
			getSpreadLimitValue: (
				from: number,
				min: number,
				max: number,
			): number => {
				return (from + self.getSpreadLimit(min, max)).limit(min, max)
			},
			getPeakedValue: (
				from: number,
				min: number,
				max: number,
			): number => {
				return (from + self.getSpreadLimit(min, max) * Processor.peak).limit(min, max)
			}
		}
	})