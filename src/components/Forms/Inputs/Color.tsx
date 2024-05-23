import React from "react"

import "styles/components/forms/inputs/color"

import { isDefined } from "utils/types"
import RangeInput from "./Range"

export interface ColorInputProps {
	value: string
	opacity?: string
	onChange: (
		value: string,
	) => void
	onOpacityChange?: (
		value: string,
	) => void
}

export interface ColorInputState {

}

export default
class ColorInput
extends React.Component<ColorInputProps, ColorInputState> {
	render() {
		const { value, opacity, onChange, onOpacityChange } = this.props
		const isOpacityEnabled = isDefined(opacity) && isDefined(onOpacityChange)

		return <>
			<div className={`c-color-input ${isOpacityEnabled ? "" : "tiny"}`}>
				<div className="ci-picker-wrapper">
					<input
						type="color"
						value={value}
						onInput={event => onChange(event.currentTarget.value)}
					/>
					<span
						className="overlap"
						style={{
							background: value,
							opacity: isDefined(opacity) ? +opacity / 100 : undefined,
						}}
					/>
				</div>
				{isOpacityEnabled &&
					<RangeInput
						min={0}
						max={100}
						step={1}
						value={opacity}
						onChange={onOpacityChange}
						marks={[0, 25, 50, 75, 100]}
					/>
				}
			</div>
		</>
	}
}