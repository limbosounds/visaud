import {} from "mobx"
import { interpolateLinearly } from "utils/array"

class SoundProcessorStore {
	private _context
		: AudioContext

	private _analyser
		: AnalyserNode

	private _waveform
		: Float32Array
		= new Float32Array(1)

	private _freq
		: Uint8Array
		= new Uint8Array(1)

	freqRange
		: Turple
		= [0, 1]

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
		this._freq = new Uint8Array(this._analyser.fftSize)

		this.freqRange = [
			0,
			this._context.sampleRate / 2,
		]
	}

	updateWaveform = () => {
		this._analyser?.getFloatTimeDomainData(this._waveform)
	}

	updateFreq = () => {
		this._analyser?.getByteFrequencyData(this._freq)
	}

	strictedFreqRange = (
		bufferLength: number,
		targetFreqRange: Turple,
		barsCount: number,
	) => {
		const [ minFreq, maxFreq ] = targetFreqRange
		const freqPerBar = this.freqRange[1] / bufferLength

		const audibleLength = Math.floor(bufferLength * maxFreq / this.freqRange[1])
		const startIndex = Math.floor(minFreq / freqPerBar)

		return interpolateLinearly(
			this.freq.slice(startIndex, audibleLength),
			barsCount,
		)
	}
}

export default
new SoundProcessorStore()