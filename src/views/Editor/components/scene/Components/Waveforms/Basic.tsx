import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components/waveforms/basic"

import { ICWaveformBasic } from "models/editor/components/waveforms/Basic"

import EditorComponentDimensions from "../Dimensions"
import Delimiter from "components/Delimiter"
import ColorInput from "components/Forms/Inputs/Color"
import Knob from "components/Forms/Knob"

export interface EditorComponentWaveformBasicProps {
	model: ICWaveformBasic
}

export interface EditorComponentWaveformBasicState {

}

@observer
export default
class EditorComponentWaveformBasic
extends React.Component<EditorComponentWaveformBasicProps, EditorComponentWaveformBasicState> {
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
				<div className="wab-appearance">
					<Knob
						model={model.weight}
						min={1}
						max={100}
						step={1}
						rodable
					>
						Weight
					</Knob>
					<ColorInput
						model={model.color}
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