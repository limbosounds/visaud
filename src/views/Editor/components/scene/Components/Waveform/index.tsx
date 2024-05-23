import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components/waveform"

import { ICWaveform } from "models/components/Waveform"

import EditorComponentDimensions from "../Dimensions"
import Delimiter from "components/Delimiter"
import ColorInput from "components/Forms/Inputs/Color"

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
			<section className="c-waveform-basics">
				<Delimiter>
					Appearance
				</Delimiter>
				<div className="wab-color">
					<ColorInput
						value={model.color.hex}
						onChange={model.color.setFromHex}
						opacity={model.color.opacity.value}
						onOpacityChange={model.color.opacity.set}
					/>
				</div>
			</section>
		</>
	}
}