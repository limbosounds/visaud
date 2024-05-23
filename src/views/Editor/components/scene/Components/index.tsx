import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components"

import Scene from "stores/Scene"
import SmallButton from "components/Buttons/Small"
import EditorComponentWaveform from "./Waveform"
import { ICWaveform } from "models/components/Waveform"

export interface EditorComponentsProps {

}

export interface EditorComponentsState {

}

@observer
export default
class EditorComponents
extends React.Component<EditorComponentsProps, EditorComponentsState> {
	getComponentManager = (
		component: NonNullable<typeof Scene["visual"]["highlightedComponent"]>
	) => {
		switch (component.type) {
			case "waveform":
				return <EditorComponentWaveform model={component as ICWaveform} />
			default:
				return null
		}
	}

	get list(): React.ReactNode {
		const { visual } = Scene

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
								<SmallButton onClick={() => visual.highlight(component.id)}>
									<i className="fas fa-cogs" />
								</SmallButton>
								<SmallButton onClick={() => visual.removeComponent(component)}>
									<i className="fas fa-trash-alt" />
								</SmallButton>
							</div>
						</header>
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
		</>
	}

	get item(): React.ReactNode {
		const { visual } = Scene
		const { highlightedComponent } = visual

		if (!highlightedComponent)
			return

		return <>
			<h1>
				<i
					className="fas fa-chevron-left"
					onClick={visual.unhighlight}	
				/>
				<span>
					{highlightedComponent.type}
				</span>
			</h1>
			<div className="ec-component-manager u-paper">
				{this.getComponentManager(highlightedComponent)}
			</div>
		</>
	}

	render() {
		const { visual } = Scene
		const { highlightedComponent } = visual

		return <>
			<div className="c-editor-components">
				{highlightedComponent
					? this.item
					: this.list
				}
			</div>
		</>
	}
}