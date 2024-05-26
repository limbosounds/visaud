import React from "react"
import { observer } from "mobx-react"

import "styles/components/cursor-pin"

export interface CursorPinProps {

}

export interface CursorPinState {
	x: number
	y: number
}

@observer
export default
class CursorPin
extends React.Component<CursorPinProps, CursorPinState> {
	state
		: Readonly<CursorPinState>
		= {
			x: 0,
			y: 0,
		}

	componentDidMount(): void {
		document.addEventListener("mousemove", this.handleMouseMove)
	}

	componentWillUnmount(): void {
		document.removeEventListener("mousemove", this.handleMouseMove)
	}

	handleMouseMove = (
		event: MouseEvent,
	) => {
		const { x, y } = event
		this.setState({ x, y })
	}

	render() {
		const { x, y } = this.state

		return <>
			<div
				id="cursorPin"
				className="c-cursor-pin"
				style={{
					"--x": `${x + 10}px`,
					"--y": `${y + 10}px`
				} as React.CSSProperties}
			/>
		</>
	}
}