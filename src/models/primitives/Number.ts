import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { isDefined } from "utils/types"

export interface INumber
extends Instance<ReturnType<typeof makePlainNumberModel>> {}
export interface INumberSnapshotIn
extends SnapshotIn<ReturnType<typeof makePlainNumberModel>> {}

export const makePlainNumberModel = (
	type: "int" | "float",
	min?: number,
	max?: number,
) => {
	const isInt = type == "int"
	const isFloat = type == "float"

	return types
		.model(`Primitive::Number(${type})`, {
			value: "",
		})
		.volatile(() => {
			return {
				min,
				max,
			}
		})
		.views(self => {
			return {
				get numeric(): number {
					const { min, max } = self
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
						self.value = value.replace(/[^\-0-9]/g, "")
					if (isFloat)
						self.value = value.replace(/[^\-0-9.]/g, "").split(".").slice(0, 2).join(".")
				},
				correct: () => {
					self.value = self.numeric.toString()
				},
			}
		})
}