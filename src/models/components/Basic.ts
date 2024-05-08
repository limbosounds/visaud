import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { makeNumberModel } from "models/primitives/Number"

export interface IComponentDimensions
extends Instance<typeof ComponentDimensionsModel> {}
export interface IComponentDimensionsSnapshotIn
extends SnapshotIn<typeof ComponentDimensionsModel> {}

export const ComponentDimensionsModel = types
	.model("ComponentDimensions", {
		top: makeNumberModel("float"),
		left: makeNumberModel("float"),
		width: makeNumberModel("int"),
		height: makeNumberModel("int"),
	})