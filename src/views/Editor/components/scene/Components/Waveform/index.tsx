import React from "react"
import { observer } from "mobx-react"
import EditorComponentDimensions from "../Dimensions"
import { ICWaveform } from "models/components/Waveform"

export interface EditorComponentWaveformProps {
	model: ICWaveform
}

export interface EditorComponentWaveformState {

}

@observer
export default
class EditorComponentWaveform
extends React.Component<EditorComponentWaveformProps, EditorComponentWaveformState> {
	render() {
		const { model } = this.props
		return <>
			<EditorComponentDimensions
				model={model.dimensions}
			/>
		</>
	}
}