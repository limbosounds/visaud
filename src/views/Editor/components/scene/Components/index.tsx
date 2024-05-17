import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components"

import Scene from "stores/Scene"

export interface EditorComponentsProps {

}

export interface EditorComponentsState {

}

@observer
export default
class EditorComponents
extends React.Component<EditorComponentsProps, EditorComponentsState> {
	render() {
		return <>
			<div className="c-editor-components">
				<h1>
					Components
				</h1>
				<div className="ec-components-list">
					{Scene.visual.components.map(component => {
						return <div
							key={component.id}
							className="ec-component u-paper"
						>
							<h2>
								{component.type}
							</h2>
						</div>
					})}
				</div>

				<div
					className="add-button"
					onClick={() => Scene.visual.addComponent("waveform")}
				>
					<i className="fas fa-plus" />
					<span>
						Add component
					</span>
				</div>
			</div>
		</>
	}
}