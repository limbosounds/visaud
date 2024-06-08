import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { v4 as uuid } from "uuid"

import Scene from "stores/Scene"

import { defaultColor } from "models/primitives/Color"
import { ReactorModel } from "models/reactor"

import { CWaveformBasicModel } from "./components/waveforms/Basic"
import { defaultDimensions } from "./components/Basic"
import { EditorComponentModel, EditorComponentType, IEditorComponent } from "./components"
import { CWaveformCircleModel } from "./components/waveforms/Circle"
import { CFreqBasicModel } from "./components/freqs/Basic"

export interface IEditor
extends Instance<typeof EditorModel> {}
export interface IEditorSnapshotIn
extends SnapshotIn<typeof EditorModel> {}

export const EditorModel = types
	.model("Editor", {
		components: types.array(EditorComponentModel),
		selectedComponent: types.safeReference(EditorComponentModel),

		reactor: ReactorModel,
	})
	.views(self => {
		return {
			isComponentSelected: (
				id: string,
			): boolean => {
				return self.selectedComponent?.id == id
			}
		}
	})
	.actions(self => {
		return {
			addComponent: (
				type: EditorComponentType,
			) => {
				switch (type) {
					case "waveform:basic":
						self.components.push(CWaveformBasicModel.create({
							id: uuid(),
							type: "waveform:basic",
							color: defaultColor(),
							dimensions: defaultDimensions(120, 80),
							weight: { value: "1" },
						}))
						break
					case "waveform:circle":
						self.components.push(CWaveformCircleModel.create({
							id: uuid(),
							type: "waveform:circle",
							color: defaultColor(),
							dimensions: defaultDimensions(240, 240),
							weight: { value: "1" },
							thickness: { value: "10" },
						}))
						break
					case "freq:basic":
						self.components.push(CFreqBasicModel.create({
							id: uuid(),
							type: "freq:basic",
							dimensions: defaultDimensions(1000, 240, 120, 240),
						}))
						break
				}
				Scene.updateFrame()
			},
			removeComponent: (
				component: IEditorComponent,
			) => {
				self.components.remove(component)
				Scene.updateFrame()
			},
			select: (
				component?: IEditorComponent,
			) => {
				self.selectedComponent = component
				Scene.updateFrame()
			},
		}
	})