import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components/dimensions"

import { IComponentDimensions } from "models/components/Basic"
import Delimiter from "components/Delimiter"
import SimpleInput from "components/Forms/Inputs/Simple"
import SmallButton from "components/Buttons/Small"
import Scene from "stores/Scene"

export interface EditorComponentDimensionsProps {
	data: IComponentDimensions
}

export interface EditorComponentDimensionsState {

}

@observer
export default
class EditorComponentDimensions
extends React.Component<EditorComponentDimensionsProps, EditorComponentDimensionsState> {
	render() {
		const { data } = this.props
		return <>
			<section className="c-component-dimensions-size">
				<Delimiter>
					Size
				</Delimiter>
				<div className="dims-row">
					<SimpleInput
						label="Width (px):"
						value={data.width.value}
						onChange={data.width.set}
						onBlur={data.width.correct}
					/>
					<SmallButton
						onClick={() => data.width.set(Scene.width.toString())}
					>
						Fit canvas
					</SmallButton>
				</div>
				<div className="dims-row">
					<SimpleInput
						label="Height (px):"
						value={data.height.value}
						onChange={data.height.set}
						onBlur={data.height.correct}
					/>
					<SmallButton
						onClick={() => data.height.set(Scene.height.toString())}
					>
						Fit canvas
					</SmallButton>
				</div>
			</section>
			<section className="c-component-dimensions-position">
				<Delimiter>
					Position
				</Delimiter>
			</section>
		</>
	}
}