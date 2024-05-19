import React from "react"
import { observer } from "mobx-react"

import { IComponentDimensions } from "models/components/Basic"

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
							value={model.left.value}
							onChange={model.left.set}
							onBlur={model.left.correct}
							numericControls
						/>
						<SimpleInput
							label="Y (px):"
							value={model.top.value}
							onChange={model.top.set}
							onBlur={model.top.correct}
							numericControls
						/>
					</div>
					<div className="dimp-column box-wrapper">
						<div className="box">
							<div className="point selected" />
							<div className="point" />
							<div className="point" />
							<div className="point" />
							<div className="point" />
							<div className="point" />
							<div className="point" />
							<div className="point" />
							<div className="point" />
						</div>
					</div>
				</div>
			</section>
		</>
	}
}