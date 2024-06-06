import { reaction } from "mobx"
import { types, Instance, SnapshotIn, addDisposer, getParent } from "mobx-state-tree"
import { makePlainNumberModel } from "models/primitives/Number"
import Scene from "stores/Scene"

export interface IComponentDimensionsAnchoring
extends Instance<typeof ComponentDimensionsAnchoringModel> {}
export interface IComponentDimensionsAnchoringSnapshotIn
extends SnapshotIn<typeof ComponentDimensionsAnchoringModel> {}

export const ComponentDimensionsAnchoringModel = types
	.model("ComponentDimensions:Anchoring", {
		h: types.union(
			types.literal("left"),
			types.literal("center"),
			types.literal("right"),
		),
		v: types.union(
			types.literal("top"),
			types.literal("middle"),
			types.literal("bottom"),
		),
	})
	.views(self => {
		return {
			get nh(): number {
				switch (self.h) {
					case "left": return 0
					case "center": return 1
					case "right": return 2
				}
			},
			get nv(): number {
				switch (self.v) {
					case "top": return 0
					case "middle": return 1
					case "bottom": return 2
				}
			}
		}
	})
	.views(self => {
		return {
			get numeric(): number {
				return self.nv * 3 + self.nh
			}
		}
	})
	.actions(self => {
		return {
			setByNumeric: (
				value: number,
			) => {
				const h = ([
					"left",
					"center",
					"right"
				] as IComponentDimensionsAnchoringSnapshotIn["h"][])[value % 3]

				const v = ([
					"top",
					"middle",
					"bottom",
				] as IComponentDimensionsAnchoringSnapshotIn["v"][])[Math.floor(value / 3)]

				try {
					const parent = getParent(self) as IComponentDimensions
					switch (h) {
						case "left":
							parent.x.set(parent.left.toString())
							break
						case "center":
							parent.x.set((parent.left + parent.width.numeric / 2).toString())
							break
						case "right":
							parent.x.set((parent.left + parent.width.numeric).toString())
							break
					}

					switch (v) {
						case "top":
							parent.y.set(parent.top.toString())
							break
						case "middle":
							parent.y.set((parent.top + parent.height.numeric / 2).toString())
							break
						case "bottom":
							parent.y.set((parent.top + parent.height.numeric).toString())
							break
					}
				} catch (e) {}

				self.h = h
				self.v = v
			}
		}
	})

export interface IComponentDimensions
extends Instance<typeof ComponentDimensionsModel> {}
export interface IComponentDimensionsSnapshotIn
extends SnapshotIn<typeof ComponentDimensionsModel> {}

export const ComponentDimensionsModel = types
	.model("ComponentDimensions", {
		x: makePlainNumberModel("float"),
		y: makePlainNumberModel("float"),
		width: makePlainNumberModel("int", 1),
		height: makePlainNumberModel("int", 1),
		anchoring: ComponentDimensionsAnchoringModel,
	})
	.views(self => {
		return {
			get top(): number {
				switch (self.anchoring.v) {
					case "top":
						return self.y.numeric
					case "middle":
						return self.y.numeric - self.height.numeric / 2
					case "bottom":
						return self.y.numeric - self.height.numeric
				}
			},
			get left(): number {
				switch (self.anchoring.h) {
					case "left":
						return self.x.numeric
					case "center":
						return self.x.numeric - self.width.numeric / 2
					case "right":
						return self.x.numeric - self.width.numeric
				}
			}
		}
	})
	.actions(self => {
		return {
			align: (
				type: IComponentDimensionsAnchoringSnapshotIn["h"] | IComponentDimensionsAnchoringSnapshotIn["v"],
			) => {
				const savedAnchoring = self.anchoring.numeric
				switch (type) {
					case "left":
						self.anchoring.setByNumeric(0)
						self.x.set("0")
						break
					case "center":
						self.anchoring.setByNumeric(1)
						self.x.set((Scene.width / 2).toString())
						break
					case "right":
						self.anchoring.setByNumeric(2)
						self.x.set(Scene.width.toString())
						break
					case "top":
						self.anchoring.setByNumeric(0)
						self.y.set("0")
						break
					case "middle":
						self.anchoring.setByNumeric(3)
						self.y.set((Scene.height / 2).toString())
						break
					case "bottom":
						self.anchoring.setByNumeric(6)
						self.y.set(Scene.height.toString())
						break
				}
				self.anchoring.setByNumeric(savedAnchoring)
			}
		}
	})
	.actions(self => {
		return {
			afterCreate: () => {
				addDisposer(self, reaction(
					() => `${self.top} ${self.left} ${self.width.numeric} ${self.height.numeric}`,
					() => Scene.updateFrame()
				))
			}
		}
	})

export const defaultDimensions = (
	width: number,
	height: number,
	x: number = 0,
	y: number = 0,
): IComponentDimensionsSnapshotIn => {
	return {
		x: { value: x.toString() },
		y: { value: y.toString() },
		width: { value: width.toString() },
		height: { value: height.toString() },
		anchoring: {
			h: "left",
			v: "top",
		}
	}
}

export const renderBounds = (
	context: CanvasRenderingContext2D,
	dimensions: IComponentDimensions,
) => {
	context.save()

	const width = 2

	context.strokeStyle = "rgba(0, 255, 255, .54)"
	context.lineWidth = width

	context.strokeRect(
		dimensions.left + width / 2,
		dimensions.top + width / 2,
		dimensions.width.numeric - width / 2,
		dimensions.height.numeric - width / 2,
	)

	context.restore()
}