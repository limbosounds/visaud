import React from "react"
import { observer } from "mobx-react"

import { IComponentDimensions, IComponentDimensionsAnchoring } from "models/editor/components/Basic"

import Delimiter from "components/Delimiter"
import SimpleInput from "components/Forms/Inputs/Simple"

export interface EditorComponentDimensionsPositionProps {
	model: IComponentDimensions
}

export interface EditorComponentDimensionsPositionState {

}

@observer
export default
class EditorComponentDimensionsPosition
extends React.Component<EditorComponentDimensionsPositionProps, EditorComponentDimensionsPositionState> {
	selectAnchoring = (
		event: React.MouseEvent<HTMLDivElement>,
		value: number,
	) => {
		this.props.model.anchoring.setByNumeric(value)
		event
	}

	render() {
		const { model } = this.props
		return <>
			<section className="c-component-dimensions-position">
				<Delimiter>
					Position
				</Delimiter>
				<div className="dimp-wrapper">
					<div className="dimp-column inputs-wrapper">
						<SimpleInput
							label="X (px):"
							value={model.x.value}
							onChange={model.x.set}
							onBlur={model.x.correct}
							numericControls
						/>
						<SimpleInput
							label="Y (px):"
							value={model.y.value}
							onChange={model.y.set}
							onBlur={model.y.correct}
							numericControls
						/>
					</div>
					<div className="dimp-column box-wrapper">
						<div className="box">
							{[...Array(9)].map((_, i) => {
								const isSelected = i == model.anchoring.numeric

								return <div
									key={i}
									className={`point ${isSelected ? "selected" : ""}`}
									onClick={event => this.selectAnchoring(event, i)}
								/>
							})}
						</div>
					</div>
				</div>
				<Delimiter>
					Align
				</Delimiter>
				<div className="dimp-a-wrapper">
					{([
						"left",
						"center",
						"right",
						"top",
						"middle",
						"bottom"
					] as (IComponentDimensionsAnchoring["h"] | IComponentDimensionsAnchoring["v"])[]).map(value => {
						return <i
							key={value}
							className={`fas fa-border-all ${value}`}
							onClick={() => model.align(value)}
						/>
					})}
				</div>
			</section>
		</>
	}
}