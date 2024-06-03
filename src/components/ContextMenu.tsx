import React from "react"
import { createPortal } from "react-dom"
import { observer } from "mobx-react"

import "styles/components/context-menu"

export interface ContextMenuProps {
	content: (
		props: {
			close: () => void
		},
	) => React.ReactNode
	children: (
		props: {
			handlers: {
				click: (
					event: React.MouseEvent<HTMLElement>,
				) => void,
			}
			close: () => void
		}
	) => React.ReactNode
}

export interface ContextMenuState {
	position?: {
		x: number
		y: number
	}
}

@observer
export default
class ContextMenu
extends React.Component<ContextMenuProps, ContextMenuState> {
	state
		: Readonly<ContextMenuState>
		= {
			position: undefined,
		}

	wrapperBox?
		: {
			x: number
			y: number
			width: number
			height: number
		}

	handleClick = (
		event: React.MouseEvent<HTMLElement>
	) => {
		const { x, y, width, height } = event.currentTarget.getBoundingClientRect()
		this.wrapperBox = {
			x, y, width, height,
		}

		this.setState({
			position: {
				x: event.clientX,
				y: event.clientY,
			}
		})
	}

	handleOutsideClick = (
		event: React.MouseEvent<HTMLDivElement>,
	) => {
		if (event.target == event.currentTarget)
			this.close()
	}

	close = () => {
		this.setState({
			position: undefined,
		})
	}

	render() {
		const { position } = this.state

		const {
			x = 0,
			y = 0,
			width: bw = 0,
			height: bh = 0,
		} = this.wrapperBox ?? {}

		const {
			innerWidth: w = 0,
			innerHeight: h = 0,
		} = typeof window == "undefined"
			? {}
			: window

		return <>
			{this.props.children({
				handlers: {
					click: this.handleClick,
				},
				close: this.close,
			})}
			{position &&
				createPortal(
					<>
						<div
							className="c-context-menu-background"
							style={{
								clipPath: `path("M0,0 H${w} V${h} H0 V0z M${x},${y} v${bh} h${bw} v${-bh} h${-bw}z")`
							}}
						/>
						<div
							className="c-context-menu"
							onClick={this.handleOutsideClick}
						>
							<div
								className="cm-content-wrapper"
								style={{
									top: position.y,
									left: position.x,
								}}
							>
								{this.props.content({ close: this.close })}
							</div>
						</div>
					</>,
					document.body
				)
			}
		</>
	}
}