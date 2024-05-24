import React from "react"
import { v4 as uuid } from "uuid"

import "styles/components/forms/inputs/range"

import { INumber } from "models/primitives/Number"

export interface RangeInputProps {
	model: INumber
	min: number
	max: number
	step: number
	children?: React.ReactNode
}

export interface RangeInputState {

}

export default
class RangeInput
extends React.Component<RangeInputProps, RangeInputState> {
	markersId
		= uuid()

	startValue
		: number
		= 0

	startY
		: number
		= 0

	dragged
		: boolean
		= false

	componentDidMount(): void {
		document.addEventListener("mousemove", this.handleMouseMove)
		document.addEventListener("mouseup", this.handleMouseUp)
	}

	componentWillUnmount(): void {
		document.removeEventListener("mousemove", this.handleMouseMove)
		document.removeEventListener("mouseup", this.handleMouseUp)
	}

	handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement>,
	) => {
		this.dragged = true
		this.startValue = this.props.model.numeric
		this.startY = event.clientY
	}

	handleMouseMove = (
		event: MouseEvent,
	) => {
		if (!this.dragged)
			return

		const delta = (this.startY - event.clientY) * this.props.step
		this.props.model.set((this.startValue + delta).toString())
	}

	handleMouseUp = () => {
		this.dragged = false
	}

	render() {
		const { model, min, max } = this.props
		const r = 48

		const progress = (model.numeric - min) / (max - min)

		return <>
			<div className="c-range-input">
				<div className="ri-round-wrapper">
					<div className="ri-scale">
						<svg viewBox={`0 0 ${r} ${r}`}>
							<circle
								className="full"
								cx={r / 2}
								cy={r / 2}
								r={(r - 2) / 2}
								pathLength={100}
							/>
							<circle
								className="current"
								cx={r / 2}
								cy={r / 2}
								r={(r - 4) / 2}
								pathLength={100}
								style={{
									"--progress": `${progress * 75}`
								} as React.CSSProperties}
							/>
						</svg>
					</div>
					<div className="ri-thumb">
						<div
							className="thumb-handle"
							style={{
								"--rotate": `${progress * (135 * 2) - 135}deg`
							} as React.CSSProperties}
							onMouseDown={this.handleMouseDown}
						/>
					</div>
					<div className="ri-value">
						{model.numeric}
					</div>
				</div>
				{this.props.children &&
					<div className="ri-label">
						{this.props.children}
					</div>
				}
			</div>
		</>
	}
}