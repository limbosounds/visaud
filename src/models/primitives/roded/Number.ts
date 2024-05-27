import { types, Instance, SnapshotIn } from "mobx-state-tree"

import { IReactorRode, ReactorRodeModel } from "models/reactor/rodes"

import { makePlainNumberModel } from "../Number"

export interface IRodedNumber
extends Instance<ReturnType<typeof makeRodedNumberModel>> {}
export interface IRodedNumberSnapshotIn
extends SnapshotIn<ReturnType<typeof makeRodedNumberModel>> {}

export const makeRodedNumberModel = (
	type: "int" | "float",
	min: number,
	max: number,
) => {
	return types.compose(
		`Rodable::Number(${type})`,
		makePlainNumberModel(type, min, max),
		types.model({
			rode: types.safeReference(ReactorRodeModel),
		})
	)
	.views(self => {
		return {
			get roded(): number {
				if (!self.rode)
					return self.numeric

				switch (self.rode.type) {
					case "peak":
						return self.rode.getPeakedValue(self.numeric, min, max)
				}
			}
		}
	})
	.actions(self => {
		return {
			attachRode: (
				rode?: IReactorRode,
			) => {
				self.rode = rode
			}
		}
	})
}