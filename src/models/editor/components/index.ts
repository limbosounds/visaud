import { types } from "mobx-state-tree"
import { CWaveformBasicModel, ICWaveformBasic } from "./waveforms/Basic"
import { CWaveformCircleModel, ICWaveformCircle } from "./waveforms/Circle"
import { CFreqBasicModel, ICFreqBasic } from "./freqs/Basic"

export type IEditorComponent =
	| ICWaveformBasic
	| ICWaveformCircle
	| ICFreqBasic

export type EditorComponentType = IEditorComponent["type"]

export const EditorComponentModel = types.union(
	CWaveformBasicModel,
	CWaveformCircleModel,
	CFreqBasicModel,
)