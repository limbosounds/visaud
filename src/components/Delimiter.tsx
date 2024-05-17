import React from "react"

import "styles/components/delimiter"

export interface DelimiterProps {
	children?: React.ReactNode
}

export interface DelimiterState {

}

export default
class Delimiter
extends React.Component<DelimiterProps, DelimiterState> {
	render() {
		return <>
			<div className="c-delimiter">
				<div className="dl-content">
					{this.props.children}
				</div>
			</div>
		</>
	}
}