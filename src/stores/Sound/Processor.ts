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

	/**
	 * From 0 (silence) to 1 (max volume)
	 */
	get peak(): number {
		return this.waveform.reduce((max, current) => {
			return Math.max(max, Math.abs(current))
		}, 0)
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

		this._waveform = new Float32Array(this._analyser.fftSize)
		this._freq = new Float32Array(this._analyser.fftSize)
	}

	updateWaveform = () => {
		this._analyser?.getFloatTimeDomainData(this._waveform)
	}

	updateFreq = () => {
		this._analyser?.getFloatFrequencyData(this._freq)
	}
}

export default
new SoundProcessorStore()