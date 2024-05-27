import React from "react"
import { v4 as uuid } from "uuid"
import { observer } from "mobx-react"

import "styles/components/forms/knob"

import { IRodedNumber } from "models/primitives/roded/Number"
import { INumber } from "models/primitives/Number"
import Scene from "stores/Scene"

export interface KnobProps<R extends boolean = false> {
	rodable: R
	model: R extends true ? IRodedNumber : INumber
	min: number
	max: number
	step: number
	twoside?: boolean
	children?: React.ReactNode
}

export interface KnobState {

}

@observer
export default
class Knob<R extends boolean>
extends React.Component<KnobProps<R>, KnobState> {
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
		if (this.props.rodable && Scene.editor.reactor.attachableRode) {
			(this.props.model as IRodedNumber).attachRode(Scene.editor.reactor.attachableRode)
			Scene.editor.reactor.setAttachableRode()
		} else {
			this.dragged = true
			this.startValue = this.props.model.numeric
			this.startY = event.clientY
		}
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
		const { rodable = false, model, min, max, twoside } = this.props
		const r = 48
		const rr = 44

		const cappedNumeric = model.numeric.limit(min, max)
		const progress = (cappedNumeric - min) / (max - min)

		let rodedMaxProgress = 0
		if (rodable) {
			const { rode } = model as IRodedNumber
			if (rode) {
				const maxSpread = rode.getSpreadLimit(min, max)
				const capped = maxSpread < 0
					? Math.max(-cappedNumeric, maxSpread)
					: Math.min(max - cappedNumeric, maxSpread)
				rodedMaxProgress = (capped - min) / (max - min)
			}
		}

		const { attachableRode } = Scene.editor.reactor

		return <>
			<div className="c-range-input">
				<div className={`ri-round-wrapper ${rodable && attachableRode ? "u-highlight" : ""}`}>
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
								className={`current ${twoside ? "twoside" : ""} ${progress > 0.5 ? "overhalf" : ""}`}
								cx={r / 2}
								cy={r / 2}
								r={(r - 4) / 2}
								pathLength={100}
								style={{
									"--progress": `${progress * 75}`
								} as React.CSSProperties}
							/>
							{rodable && (model as IRodedNumber).rode &&
								<circle
									className={`roded ${rodedMaxProgress < 0 ? "negative" : ""}`}
									cx={r / 2}
									cy={r / 2}
									r={(rr - 4) / 2}
									pathLength={100}
									style={{
										"--progress": `${progress * 75}`,
										"--max-progress": `${rodedMaxProgress * 75}`,
									} as React.CSSProperties}
								/>
							}
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
						{/* {rodable && (model as IRodedNumber).rode &&
							<div
								className="thumb-handle rode"
								style={{
									"--rotate": `${progress * (135 * 2) - 135}deg`
								} as React.CSSProperties}
							>

							</div>
						} */}
					</div>
					<div className="ri-value">
						{rodable
							? <>
								<i className={`fas fa-atom ${attachableRode ? "highlight" : ""} ${(model as IRodedNumber).rode ? "roded" : ""}`} />
								<span className="value">
									{model.numeric}
								</span>
							</>
							: <span className="value">
								{model.numeric}
							</span>
						}

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