import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { PeakRodeModel } from "./rodes/peak"
import { IReactorRode, ReactorRodeType } from "./rodes"

export interface IReactor
extends Instance<typeof ReactorModel> {}
export interface IReactorSnapshotIn
extends SnapshotIn<typeof ReactorModel> {}

export const ReactorModel = types
	.model("ReactorModel", {
		rodes: types.array(
			types.union(
				PeakRodeModel,
			)
		),
		attachableRode: types.maybe(types.string),
	})
	.views(self => {
		return {
			getRodeById: (
				id: string,
			) => {
				return self.rodes.find(rode => rode.id == id)
			}
		}
	})
	.actions(self => {
		return {
			setAttachableRode: (
				value?: string,
			) => {
				self.attachableRode = value
			},
			addRode: (
				type: ReactorRodeType,
			) => {
				switch (type) {
					case "peak":
						self.rodes.push(PeakRodeModel.create({
							type: "peak",
							spread: { value: "0" },
						}))
						break
				}
			},
			removeRode: (
				rode: IReactorRode,
			) => {
				self.rodes.remove(rode)
			},
		}
	})
