import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components"

import Scene from "stores/Scene"

import { ICWaveform } from "models/editor/components/Waveform"
import { IEditorComponent } from "models/editor/components"

import SmallButton from "components/Buttons/Small"
import EditorComponentWaveform from "./Waveform"

export interface EditorComponentsProps {

}

export interface EditorComponentsState {

}

@observer
export default
class EditorComponents
extends React.Component<EditorComponentsProps, EditorComponentsState> {
	getComponentManager = (
		component: IEditorComponent,
	) => {
		switch (component.type) {
			case "waveform":
				return <EditorComponentWaveform model={component as ICWaveform} />
			default:
				return null
		}
	}

	get list(): React.ReactNode {
		const { editor: visual } = Scene

		return <>
			<h1>
				Components
			</h1>
			<div className="ec-components-list">
				{visual.components.map(component => {
					return <div
						key={component.id}
						className="ec-component u-paper"
					>
						<header>
							<div className="name">
								<h2>
									{component.type}
								</h2>
								<p className="u-dimmed">
									ID: <strong>{component.id}</strong>
								</p>
							</div>
							<div className="actions">
								<SmallButton
									iconOnly
									onClick={() => visual.select(component)}
								>
									<i className="fas fa-cogs" />
								</SmallButton>
								<SmallButton
									iconOnly
									onClick={() => visual.removeComponent(component)}
								>
									<i className="fas fa-trash-alt" />
								</SmallButton>
							</div>
						</header>
					</div>
				})}
			</div>

			<div
				className="u-add-button"
				onClick={() => Scene.editor.addComponent("waveform")}
			>
				<i className="fas fa-plus" />
				<span>
					Add component
				</span>
			</div>
		</>
	}

	get item(): React.ReactNode {
		const { editor: visual } = Scene
		const { selectedComponent } = visual

		if (!selectedComponent)
			return

		return <>
			<h1>
				<i
					className="fas fa-chevron-left"
					onClick={() => visual.select()}	
				/>
				<span>
					{selectedComponent.type}
				</span>
			</h1>
			<div className="ec-component-manager u-paper">
				{this.getComponentManager(selectedComponent)}
			</div>
		</>
	}

	render() {
		const { editor } = Scene

		return <>
			<div className="c-editor-components">
				{editor.selectedComponent
					? this.item
					: this.list
				}
			</div>
		</>
	}
}