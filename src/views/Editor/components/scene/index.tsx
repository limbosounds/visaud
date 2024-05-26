import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene"

import EditorSceneRenderer from "./Renderer"
import EditorComponents from "./Components"
import Player from "components/Player"
import ResizableHorizontal from "components/Resizable/Horizontal"
import ReactorView from "../Reactor"

export interface EditorSceneProps {

}

export interface EditorSceneState {

}

@observer
export default
class EditorScene
extends React.Component<EditorSceneProps, EditorSceneState> {
	render() {
		return <>
			<div className="c-editor-scene">
				<div className="renderer-row">
					<div className="renderer">
						<EditorSceneRenderer />
					</div>
					<ResizableHorizontal
						className="components"
					>
						<EditorComponents />
					</ResizableHorizontal>
				</div>
				<div className="reactor-row">
					<ReactorView />
				</div>
				<div className="player-row">
					<Player />
				</div>
			</div>
			
		</>
	}
}