import { types, Instance, SnapshotIn } from "mobx-state-tree"

import Processor from "stores/Sound/Processor"

import { makePlainNumberModel } from "models/primitives/Number"

export interface IPeakRode
extends Instance<typeof PeakRodeModel> {}
export interface IPeakRodeSnapshotIn
extends SnapshotIn<typeof PeakRodeModel> {}

export const PeakRodeModel = types
	.model("Rodes::Peak", {
		id: types.identifier,
		type: types.literal("peak"),
		spread: makePlainNumberModel("float", -100, 100),
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