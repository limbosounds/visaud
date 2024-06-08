import { easing } from "./number"

type Interpolatable =
	| number[]
	| Uint8Array

// Credits: https://stackoverflow.com/a/26941169/7268109
export const interpolateLinearly = <T extends Interpolatable>(
	array: T,
	newSize: number,
): T => {
	const defaultValue = () => {
		switch (true) {
			case array instanceof Uint8Array:
				return new Uint8Array(newSize)
			default:
				return new Array(newSize)
		}
	}

    const interpolated = defaultValue() as T
    const springFactor = (array.length - 1) / (newSize - 1)

	interpolated[0] = array[0]
    for (let i = 1; i < newSize - 1; i++) {
        var temp = i * springFactor
        var before = Math.floor(temp)
        var after = Math.ceil(temp)
        var progress = temp - before
        interpolated[i] = easing.linear(array[before], array[after], progress)
    }
    interpolated[newSize - 1] = array[array.length - 1]
    return interpolated
}