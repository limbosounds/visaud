import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/renderer"
import Scene from "stores/Scene"

export interface EditorSceneRendererProps {

}

export interface EditorSceneRendererState {
	scale: number
}

@observer
export default
class EditorSceneRenderer
extends React.Component<EditorSceneRendererProps, EditorSceneRendererState> {
	state
		: Readonly<EditorSceneRendererState>
		= {
			scale: 1
		}
		
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

		const {
			offsetHeight: parentHeight = 0,
			offsetWidth: parentWidth = 0
		} = this.canvas.parentElement ?? {}

		this.setState({
			scale: parentWidth / parentHeight >= Scene.ratio
				// scale by width
				? parentWidth / Scene.width
				// scale by height
				: parentHeight / Scene.height,
		})
	}

	render() {
		return <>
			<div className="c-editor-scene-renderer">
				<div className="outer-wrapper">
					<div className="inner-wrapper">
						<canvas
							width={1920}
							height={1080}
							style={{
								transform: `scale(${this.state.scale}) translateZ(0)`
							}}
							ref={r => {
								Scene.useCanvas(r)
								this.canvas = r
							}}
						/>
					</div>
				</div>
			</div>
		</>
	}
}