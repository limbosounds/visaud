import { types } from "mobx-state-tree"
import { CWaveformBasicModel, ICWaveformBasic } from "./waveforms/Basic"
import { CWaveformCircleModel, ICWaveformCircle } from "./waveforms/Circle"

export type IEditorComponent =
	| ICWaveformBasic
	| ICWaveformCircle

export type EditorComponentType = IEditorComponent["type"]

export const EditorComponentModel = types.union(
	CWaveformBasicModel,
	CWaveformCircleModel,
)