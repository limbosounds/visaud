import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { v4 as uuid } from "uuid"

import { PeakRodeModel } from "./rodes/Peak"
import { IReactorRode, ReactorRodeModel, ReactorRodeType } from "./rodes"

export interface IReactor
extends Instance<typeof ReactorModel> {}
export interface IReactorSnapshotIn
extends SnapshotIn<typeof ReactorModel> {}

export const ReactorModel = types
	.model("ReactorModel", {
		rodes: types.array(ReactorRodeModel),
		attachableRode: types.safeReference(ReactorRodeModel),
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
				value?: IReactorRode,
			) => {
				self.attachableRode = value
			},
			addRode: (
				type: ReactorRodeType,
			) => {
				switch (type) {
					case "peak":
						self.rodes.push(PeakRodeModel.create({
							id: uuid(),
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
