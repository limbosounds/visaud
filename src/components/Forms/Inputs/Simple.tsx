import React from "react"

import "styles/components/forms/inputs/simple"

import { isDefined } from "utils/types"

export interface InputNumericControls {
	step?: number
}

export interface SimpleInputProps {
	label?: React.ReactNode
	value: string
	numericControls?: boolean | InputNumericControls
	onChange: (
		value: string
	) => void
	onBlur?: () => void
}

export interface SimpleInputState {

}

export default
class SimpleInput
extends React.Component<SimpleInputProps, SimpleInputState> {
	private get numericControls(): Required<InputNumericControls> {
		const defaultControls: Required<InputNumericControls> = {
			step: 1,
		}

		if (typeof this.props.numericControls == "boolean")
			return defaultControls

		return {
			...(this.props.numericControls ?? {}),
			...defaultControls,
		}
	}

	private get areNumericControlsEnabled(): boolean {
		const { numericControls = false } = this.props
		return numericControls != false
	}

	intervalId?
		: number
		= undefined

	componentWillUnmount(): void {
		this.stopInterval()
	}

	inc = (
		type: "inc" | "dec",
		step: number,
	) => {
		this.props.onChange((+this.props.value + (type == "inc" ? step : -step)).toString())
	}

	runInterval = (
		type: "inc" | "dec",
	) => {
		if (isDefined(this.intervalId))
			return

		const { step } = this.numericControls

		this.inc(type, step)
		this.intervalId = window.setTimeout(() => {
			this.intervalId = window.setInterval(() => this.inc(type, step))
		}, 100)
	}

	stopInterval = () => {
		clearTimeout(this.intervalId)
		clearInterval(this.intervalId)
		this.intervalId = undefined
	}

	handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		switch (event.key) {
			case "ArrowUp":
			case "ArrowDown":
				if (this.areNumericControlsEnabled) {
					event.preventDefault()
					this.runInterval(event.key == "ArrowUp" ? "inc" : "dec")
				}
				break
		}
	}

	handleKeyUp = (
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		switch (event.key) {
			case "ArrowUp":
			case "ArrowDown":
				this.stopInterval()
				break
		}
	}

	handleBlur = () => {
		this.props.onBlur?.()
		this.stopInterval()
	}

	render() {
		const { label, value, onChange } = this.props

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
						onBlur={this.handleBlur}
						onKeyDown={this.handleKeyDown}
						onKeyUp={this.handleKeyUp}
					/>
				</div>
			</div>
		</>
	}
}