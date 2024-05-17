import React from "react"

import "styles/components/buttons/small"

export interface SmallButtonProps {
	onClick?: () => void
	children?: React.ReactNode
}

export interface SmallButtonState {

}

export default
class SmallButton
extends React.Component<SmallButtonProps, SmallButtonState> {
	render() {
		return <>
			<div
				className="c-small-button"
				onClick={this.props.onClick}
			>
				{this.props.children}
			</div>
		</>
	}
}