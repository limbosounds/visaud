import React from "react"
import { observer } from "mobx-react"

import SoundSource from "stores/SoundSource"
import Player from "components/Player"
import EditorSceneRenderer from "./components/scene/Renderer"

export interface EditorViewProps {

}

export interface EditorViewState {

}

@observer
export default
class EditorView
extends React.Component<EditorViewProps, EditorViewState> {
	handleAudioPick = (
		event: React.FormEvent<HTMLInputElement>
	) => {
		const input = event.currentTarget
		if (!input.value || !input.files)
			return

		const audio = input.files[0]
		if (!audio)
			return

		SoundSource.useFile(audio)
	}

	render() {
		return <>
			<h1>
				Hello, Editor
			</h1>
			<React.Fragment key={SoundSource.version}>
				{SoundSource.file
					? <>
						<Player />
						<EditorSceneRenderer />
					</>
					: <input
						type="file"
						accept=".mp3, .wav"
						placeholder="Select audio"
						onChange={this.handleAudioPick}
					/>
				}
			</React.Fragment>
		</>
	}
}