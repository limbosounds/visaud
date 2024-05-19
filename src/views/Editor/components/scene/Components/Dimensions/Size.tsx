import React from "react"
import { observer } from "mobx-react"

import { IComponentDimensions } from "models/components/Basic"

import Scene from "stores/Scene"

import Delimiter from "components/Delimiter"
import SimpleInput from "components/Forms/Inputs/Simple"
import SmallButton from "components/Buttons/Small"

export interface EditorComponentDimensionsSizeProps {
	model: IComponentDimensions
}

export interface EditorComponentDimensionsSizeState {

}

@observer
export default
class EditorComponentDimensionsSize
extends React.Component<EditorComponentDimensionsSizeProps, EditorComponentDimensionsSizeState> {
	render() {
		const { model } = this.props
		return <>
			<section className="c-component-dimensions-size">
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
		</>
	}
}