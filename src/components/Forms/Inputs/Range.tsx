import React from "react"
import { v4 as uuid } from "uuid"

import "styles/components/forms/inputs/range"

export interface RangeInputProps {
	value: string
	onChange: (
		value: string,
	) => void

	min: number
	max: number
	step: number
	marks?: number[]
}

export interface RangeInputState {

}

export default
class RangeInput
extends React.Component<RangeInputProps, RangeInputState> {
	markersId
		= uuid()

	render() {
		const { marks } = this.props
		return <>
			<div className="c-range-input">
				<input
					type="range"
					value={this.props.value}	
					onChange={event => this.props.onChange(event.currentTarget.value)}
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					list={marks ? this.markersId : undefined}
				/>
			</div>
			{marks &&
				<datalist id={this.markersId}>
					{marks.map((mark, i) => {
						return <option
							key={i}
							value={mark}
						/>
					})}
				</datalist>
			}
		</>
	}
}