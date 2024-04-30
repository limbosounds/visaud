import React from "react"
import { observer } from "mobx-react"

import "@sounds.of.limbo/tooltip/styles/sass/tooltip"
import "styles/fonts"
import "styles/main"
import "styles/uni"

import EditorView from "views/Editor"

export interface AppProps {

}

export interface AppState {

}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	render() {
		return <>
			<EditorView />
		</>
	}
}