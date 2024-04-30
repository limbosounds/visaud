import {} from "mobx"

class SoundProcessorStore {
	private _context
		: AudioContext

	private _analyser
		: AnalyserNode

	private _waveform
		: Float32Array
		= new Float32Array(1)

	private _freq
		: Float32Array
		= new Float32Array(1)

	get context() {
		return this._context
	}

	get analyser() {
		return this._analyser
	}

	get waveform() {
		return this._waveform
	}

	get freq() {
		return this._freq
	}

	useAudio = (
		element: HTMLAudioElement,
	) => {
		if (!this._context) {
			this._context = new AudioContext()
			this._analyser = this._context.createAnalyser()
		}
		const source = this._context.createMediaElementSource(element)
		source.connect(this._analyser)
		source.connect(this._context.destination)
	}

	updateWaveform = () => {
		this._analyser.getFloatTimeDomainData(this._waveform)
	}

	updateFreq = () => {
		this._analyser.getFloatFrequencyData(this._freq)
	}
}

export default
new SoundProcessorStore()