import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { isDefined } from "utils/types"

export interface INumber
extends Instance<ReturnType<typeof makeNumberModel>> {}
export interface INumberSnapshotIn
extends SnapshotIn<ReturnType<typeof makeNumberModel>> {}

export const makeNumberModel = (
	type: "int" | "float",
	min?: number,
	max?: number,
) => {
	const isInt = type == "int"
	const isFloat = type == "float"
	return types
		.model(`Primitive::Number_${type}`, {
			value: "",
		})
		.views(self => {
			return {
				get numeric(): number {
					const numeric = Number(self.value)
					if (isNaN(numeric))
						return min ?? 0
					if (isDefined(min) && numeric < min)
						return min
					if (isDefined(max) && numeric > max)
						return max
					return numeric
				},
			}
		})
		.actions(self => {
			return {
				set: (
					value: string,
				) => {
					if (isInt)
						self.value = value.replace(/[^0-9]/g, "")
					if (isFloat)
						self.value = value.replace(/[^0-9.]/g, "").split(".").slice(0, 2).join(".")
				},
				correct: () => {
					self.value = self.numeric.toString()
				},
			}
		})
}