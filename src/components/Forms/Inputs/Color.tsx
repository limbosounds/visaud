import React from "react"

import "styles/components/forms/inputs/color"

import { isDefined } from "utils/types"
import Knob from "../Knob"
import { IColor } from "models/primitives/Color"

export interface ColorInputProps {
	model: IColor
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
		const { value, opacity, onChange, onOpacityChange, model } = this.props
		const isOpacityEnabled = isDefined(opacity) && isDefined(onOpacityChange)

		return <>
			<div className="c-color-input">
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
				<Knob
					model={model.opacity}
					min={0}
					max={100}
					step={1}
					rodable
				>
					Opacity
				</Knob>
			}
		</>
	}
}