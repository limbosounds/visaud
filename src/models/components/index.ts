import { defaultColor } from "models/primitives/Color"
import { CWaveformModel, ICWaveform } from "./Waveform"
import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { defaultDimensions } from "./Basic"
import Scene from "stores/Scene"

export type VisualComponent =
	| ICWaveform

export type VisualComponentType = VisualComponent["type"]

export interface IVisual
extends Instance<typeof VisualModel> {}
export interface IVisualSnapshotIn
extends SnapshotIn<typeof VisualModel> {}

export const VisualModel = types
	.model("Visual", {
		components: types.array(
			types.union(
				CWaveformModel,
			)
		),
		highlighted: types.maybe(types.string),
	})
	.views(self => {
		return {
			get highlightedComponent() {
				return self.components.find(component => component.id == self.highlighted)
			}
		}
	})
	.actions(self => {
		return {
			addComponent: (
				type: VisualComponentType,
			) => {
				switch (type) {
					case "waveform":
						self.components.push(CWaveformModel.create({
							type: "waveform",
							color: defaultColor(),
							dimensions: defaultDimensions(120, 80),
							heaviness: { value: "1" },
						}))
					break
				}
				Scene.updateFrame()
			},
			removeComponent: (
				component: VisualComponent,
			) => {
				// detach(component)
				self.components.remove(component)
			},
			highlight: (
				id: string,
			) => {
				self.highlighted = id
				Scene.updateFrame()
			},
			unhighlight: () => {
				self.highlighted = undefined
				Scene.updateFrame()
			}
		}
	})