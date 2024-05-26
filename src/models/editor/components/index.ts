import { types } from "mobx-state-tree"
import { CWaveformModel, ICWaveform } from "./Waveform"

export type IEditorComponent =
	| ICWaveform

export type EditorComponentType = IEditorComponent["type"]

export const EditorComponentModel = types.union(
	CWaveformModel,
)