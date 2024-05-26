import { types } from "mobx-state-tree";
import { IPeakRode, PeakRodeModel } from "./Peak"

export type IReactorRode =
	| IPeakRode

export type ReactorRodeType = IReactorRode["type"]

export const ReactorRodeModel = types.union(
	PeakRodeModel
)