import { types, Instance, SnapshotIn, addDisposer } from "mobx-state-tree"
import { makePlainNumberModel } from "./Number"
import { makeRodedNumberModel } from "./roded/Number"
import { reaction } from "mobx"
import Scene from "stores/Scene"

export interface IColor
extends Instance<typeof ColorModel> {}
export interface IColorSnapshotIn
extends SnapshotIn<typeof ColorModel> {}

export const ColorModel = types
	.model("Primitive::Color", {
		red: makePlainNumberModel("int", 0, 255),
		green: makePlainNumberModel("int", 0, 255),
		blue: makePlainNumberModel("int", 0, 255),
		opacity: makeRodedNumberModel("int", 0, 100),
	})
	.views(self => {
		const { red, green, blue, opacity } = self
		return {
			get rgb(): string {
				return `rgb(${red.numeric}, ${green.numeric}, ${blue.numeric})`
			},
			get rgba(): string {
				return `rgba(${red.numeric}, ${green.numeric}, ${blue.numeric}, ${opacity.numeric / 100})`
			},
			get hex(): string {
				return `#${
					self.red.numeric.toString(16).padStart(2, "0") }${
					self.green.numeric.toString(16).padStart(2, "0") }${
					self.blue.numeric.toString(16).padStart(2, "0")
				}`
			}
		}
	})
	.actions(self => {
		return {
			setFromHex: (
				value: string
			) => {
				const clear = value.replace("#", "")
				if (clear.length != 6)
					return console.warn("Wrong hex color value: " + value)

				self.red.set(parseInt(clear.slice(0, 2), 16).toString())
				self.green.set(parseInt(clear.slice(2, 4), 16).toString())
				self.blue.set(parseInt(clear.slice(4, 6), 16).toString())
			},
			setOpacity: (
				value: number,
			) => {
				self.opacity.set(value.toString())
			}
		}
	})
	.actions(self => {
		return {
			afterCreate: () => {
				addDisposer(self, reaction(
					() => `${self.hex} ${self.opacity.numeric}`,
					() => Scene.updateFrame()
				))
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