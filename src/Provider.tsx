import React from "react"
import { Helmet } from "react-helmet"

import App from "App"

export interface ProviderProps {

}

export interface ProviderState {

}

export default
class Provider
extends React.Component<ProviderProps, ProviderState> {
	render() {
		return <>
			<Helmet>
				<link
					rel="stylesheet" 
					href="/static/shared/font-awesome/style.css"
				/>
			</Helmet>
			
			<App />
		</>
	}
}