import { defaultColor } from "models/primitives/Color"
import { CWaveformModel, ICWaveform } from "./Waveform"
import { types, Instance, SnapshotIn } from "mobx-state-tree"
import { defaultDimensions } from "./Basic"

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
		)
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
			},
			removeComponent: (
				component: VisualComponent,
			) => {
				// detach(component)
				self.components.remove(component)
			},
		}
	})