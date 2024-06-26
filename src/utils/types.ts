export const isDefined = <T>(
	value?: T,
): value is T => {
	return typeof value != "undefined"
}