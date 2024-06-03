import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/scene/components/waveforms/basic"

import { ICWaveformCircle } from "models/editor/components/waveforms/Circle"

import EditorComponentDimensions from "../Dimensions"
import Delimiter from "components/Delimiter"
import ColorInput from "components/Forms/Inputs/Color"
import Knob from "components/Forms/Knob"
import SimpleInput from "components/Forms/Inputs/Simple"

export interface EditorComponentWaveformCircleProps {
	model: ICWaveformCircle
}

export interface EditorComponentWaveformCircleState {

}

@observer
export default
class EditorComponentWaveformCircle
extends React.Component<EditorComponentWaveformCircleProps, EditorComponentWaveformCircleState> {
	render() {
		const { model } = this.props
		return <>
			<EditorComponentDimensions
				circled
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
				<div className="wab-thickness">
					<SimpleInput
						label="Thickness (px):"
						value={model.thickness.value}
						onChange={model.thickness.set}
						onBlur={model.thickness.correct}
						numericControls
					/>
				</div>
			</section>
		</>
	}
}