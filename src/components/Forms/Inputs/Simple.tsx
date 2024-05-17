import React from "react"

import "styles/components/forms/inputs/simple"

import { isDefined } from "utils/types"

export interface SimpleInputProps {
	label?: React.ReactNode
	value: string
	onChange: (
		value: string
	) => void
	onBlur: () => void
}

export interface SimpleInputState {

}

export default
class SimpleInput
extends React.Component<SimpleInputProps, SimpleInputState> {
	render() {
		const { label, value, onChange, onBlur } = this.props

		const hasLabel = isDefined(label)

		return <>
			<div className="c-simple-input">
				<div className="input-wrapper">
					{hasLabel &&
						<div className="label">
							{label}
						</div>
					}
					<input
						type="text"
						className={`${hasLabel ? "labeled" : ""}`}
						value={value}
						onChange={event => onChange(event.currentTarget.value)}
						onBlur={onBlur}
					/>
				</div>
			</div>
		</>
	}
}