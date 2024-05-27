import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/reactor/components/rodes/peak"
import { IPeakRode } from "models/reactor/rodes/Peak"
import Knob from "components/Forms/Knob"

export interface PeakRodeProps {
	model: IPeakRode
}

export interface PeakRodeState {

}

@observer
export default
class PeakRode
extends React.Component<PeakRodeProps, PeakRodeState> {
	render() {
		return <>
			<div className="c-peak-rode">
				<Knob
					rodable={false}
					model={this.props.model.spread}
					min={-100}
					max={100}
					step={1}
					twoside
				>
					Spread
				</Knob>
			</div>
		</>
	}
}