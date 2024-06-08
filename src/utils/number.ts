export type EasingType = keyof typeof easing

export const easing = {
	linear: (
		from: number,
		to: number,
		/**
		 * From 0 to 1
		 */
		progress: number,
	) => {
		return from + (to - from) * progress
	}
}