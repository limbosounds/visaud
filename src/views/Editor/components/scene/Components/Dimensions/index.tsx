import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components/dimensions"

import { IComponentDimensions } from "models/editor/components/Basic"

import EditorComponentDimensionsSize from "./Size"
import EditorComponentDimensionsPosition from "./Position"

export interface EditorComponentDimensionsProps {
	model: IComponentDimensions
}

export interface EditorComponentDimensionsState {

}

@observer
export default
class EditorComponentDimensions
extends React.Component<EditorComponentDimensionsProps, EditorComponentDimensionsState> {
	render() {
		const { model } = this.props
		return <>
			<EditorComponentDimensionsPosition model={model} />
			<EditorComponentDimensionsSize model={model} />
		</>
	}
}