import { createBrowserHistory } from "history"

type HistoryType = ReturnType<typeof createBrowserHistory>

class RoutingStore {
	private _history
		: HistoryType
		= createBrowserHistory()

	get history() {
		return this._history
	}

	useHistory = (
		history: HistoryType
	) => {
		this._history = history
	}

	static = (
		path: string,
	): string => {
		return `/static/${path}`
	}
}

export default
new RoutingStore()