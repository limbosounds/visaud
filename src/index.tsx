import React from "react"
import { createRoot } from "react-dom/client"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"

import Routing from "stores/Routing"

import Provider from "Provider"

const root = createRoot(document.getElementById("__root")!)

const history = createBrowserHistory({
	// TODO getUserConfirmation if needed
})

Routing.useHistory(history)
root.render(
	<Router
		history={history}
	>
		<Provider

		/>
	</Router>
)