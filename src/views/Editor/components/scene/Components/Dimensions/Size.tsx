import React from "react"
import { observer } from "mobx-react"

import { IComponentDimensions } from "models/editor/components/Basic"

import Scene from "stores/Scene"

import Delimiter from "components/Delimiter"
import SimpleInput from "components/Forms/Inputs/Simple"
import SmallButton from "components/Buttons/Small"

export interface EditorComponentDimensionsSizeProps {
	model: IComponentDimensions
	circled?: boolean
}

export interface EditorComponentDimensionsSizeState {

}

@observer
export default
class EditorComponentDimensionsSize
extends React.Component<EditorComponentDimensionsSizeProps, EditorComponentDimensionsSizeState> {
	render() {
		const { model, circled = false } = this.props
		return circled
			? <section className="c-component-dimensions-size">
				<Delimiter>
					Size
				</Delimiter>
				<div className="dims-row">
					<SimpleInput
						label="Radius (px):"
						value={model.width.value}
						onChange={value => {
							model.width.set(value)
							model.height.set(value)
						}}
						onBlur={() => {
							model.width.correct()
							model.height.correct()
						}}
						numericControls
					/>
				</div>
			</section>
			: <section className="c-component-dimensions-size">
				<Delimiter>
					Size
				</Delimiter>
				<div className="dims-row">
					<SimpleInput
						label="Width (px):"
						value={model.width.value}
						onChange={model.width.set}
						onBlur={model.width.correct}
						numericControls
					/>
					<SmallButton
						onClick={() => model.width.set(Scene.width.toString())}
					>
						Fit canvas
					</SmallButton>
				</div>
				<div className="dims-row">
					<SimpleInput
						label="Height (px):"
						value={model.height.value}
						onChange={model.height.set}
						onBlur={model.height.correct}
						numericControls
					/>
					<SmallButton
						onClick={() => model.height.set(Scene.height.toString())}
					>
						Fit canvas
					</SmallButton>
				</div>
			</section>
	}
}