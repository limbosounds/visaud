import { action, computed, makeObservable, observable } from "mobx"

class SoundSourceStore {
	private _file?
		: File

	private _objectUrl
		: string
		= ""

	@observable
	private _version
		: number
		= 0

	constructor() {
		makeObservable(this)
	}

	get file() {
		return this._file
	}

	get objectUrl() {
		return this._objectUrl
	}

	@computed
	get version() {
		return this._version
	}

	@action
	useFile = (
		file: File,
	) => {
		this._file = file
		this._objectUrl = URL.createObjectURL(file)
		this._version++
	}
}

export default
new SoundSourceStore()