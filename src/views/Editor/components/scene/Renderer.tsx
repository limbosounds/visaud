import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/renderer"
import Scene from "stores/Scene"

export interface EditorSceneRendererProps {

}

export interface EditorSceneRendererState {

}

@observer
export default
class EditorSceneRenderer
extends React.Component<EditorSceneRendererProps, EditorSceneRendererState> {
	render() {
		return <>
			<canvas
				ref={r => Scene.useCanvas(r)}
				className="c-editor-scene-renderer"
			/>
		</>
	}
}