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
	canvas
		: null | HTMLCanvasElement

	componentDidMount(): void {
		this.fitCanvasSize()
		window.addEventListener("resize", this.fitCanvasSize)
	}

	componentWillUnmount(): void {
		window.removeEventListener("resize", this.fitCanvasSize)
	}

	fitCanvasSize = () => {
		if (!this.canvas)
			return

		this.canvas.width = this.canvas.parentElement?.offsetWidth!
		this.canvas.height = this.canvas.parentElement?.offsetHeight!

		Scene.updateFrame()
	}

	render() {
		return <>
			<div className="c-editor-scene-renderer">
				<div className="inner-wrapper">
					<canvas
						ref={r => {
							Scene.useCanvas(r)
							this.canvas = r
						}}
					/>
				</div>
			</div>
		</>
	}
}