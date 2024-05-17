import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { makeNumberModel } from "./Number"

export interface IColor
extends Instance<typeof ColorModel> {}
export interface IColorSnapshotIn
extends SnapshotIn<typeof ColorModel> {}

export const ColorModel = types
	.model("Primitive::Color", {
		red: makeNumberModel("int", 0, 255),
		green: makeNumberModel("int", 0, 255),
		blue: makeNumberModel("int", 0, 255),
		opacity: makeNumberModel("float", 0, 100)
	})
	.views(self => {
		const { red, green, blue, opacity } = self
		return {
			get rgb(): string {
				return `rgb(${red.numeric}, ${green.numeric}, ${blue.numeric})`
			},
			get rgba(): string {
				return `rgba(${red.numeric}, ${green.numeric}, ${blue.numeric}, ${opacity.numeric / 100})`
			}
		}
	})

export const defaultColor = (): IColorSnapshotIn => {
	return {
		red: { value: "255" },
		green: { value: "255" },
		blue: { value: "255" },
		opacity: { value: "100" },
	}
}