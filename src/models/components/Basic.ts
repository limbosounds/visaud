import { reaction } from "mobx"
import { types, Instance, SnapshotIn, addDisposer } from "mobx-state-tree"
import { makeNumberModel } from "models/primitives/Number"
import Scene from "stores/Scene"

export interface IComponentDimensions
extends Instance<typeof ComponentDimensionsModel> {}
export interface IComponentDimensionsSnapshotIn
extends SnapshotIn<typeof ComponentDimensionsModel> {}

export const ComponentDimensionsModel = types
	.model("ComponentDimensions", {
		top: makeNumberModel("float"),
		left: makeNumberModel("float"),
		width: makeNumberModel("int", 1),
		height: makeNumberModel("int", 1),
	})
	.actions(self => {
		return {
			afterCreate: () => {
				addDisposer(self, reaction(
					() => `${self.top.numeric} ${self.left.numeric} ${self.width.numeric} ${self.height.numeric}`,
					() => Scene.updateFrame()
				))
			}
		}
	})

export const defaultDimensions = (
	width: number,
	height: number,
): IComponentDimensionsSnapshotIn => {
	return {
		top: { value: "0" },
		left: { value: "0" },
		width: { value: width.toString() },
		height: { value: height.toString() },
	}
}

export const renderBounds = (
	context: CanvasRenderingContext2D,
	dimensions: IComponentDimensions,
) => {
	context.save()

	context.strokeStyle = "rgb(0, 255, 255)"
	context.lineWidth = 1
	context.shadowColor = "cyan"
	context.shadowBlur = 3

	context.strokeRect(
		dimensions.left.numeric,
		dimensions.top.numeric,
		dimensions.width.numeric,
		dimensions.height.numeric,
	)

	context.restore()
}