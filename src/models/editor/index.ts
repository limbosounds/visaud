import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { v4 as uuid } from "uuid"

import Scene from "stores/Scene"

import { defaultColor } from "models/primitives/Color"
import { ReactorModel } from "models/reactor"

import { CWaveformModel } from "./components/Waveform"
import { defaultDimensions } from "./components/Basic"
import { EditorComponentModel, EditorComponentType, IEditorComponent } from "./components"

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
					case "waveform":
						self.components.push(CWaveformModel.create({
							id: uuid(),
							type: "waveform",
							color: defaultColor(),
							dimensions: defaultDimensions(120, 80),
							weight: { value: "1" },
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