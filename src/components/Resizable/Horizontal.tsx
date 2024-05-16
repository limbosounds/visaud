import React from "react"

export interface ResizableHorizontalProps {
	className?: string
	maxWidth?: number
	minWidth?: number
	defaultWidth?: number
	children?: React.ReactNode
}

export interface ResizableHorizontalState {
	width: number
}

export default
class ResizableHorizontal
extends React.Component<ResizableHorizontalProps, ResizableHorizontalState> {
	state
		: Readonly<ResizableHorizontalState>
		= {
			width: this.props.defaultWidth || 320,
		}

	get cappedWidth(): number {
		const { maxWidth = Infinity, minWidth = 0 } = this.props
		const { width } = this.state

		if (width > maxWidth)
			return maxWidth
		if (width < minWidth)
			return minWidth
		return width
	}

	render() {
		return <>
			<div
				className={`c-resizable-horizontal ${this.props.className ?? ""}`}
				style={{
					width: this.cappedWidth
				}}
			>
				{this.props.children}
			</div>
		</>
	}
}