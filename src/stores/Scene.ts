import {} from "mobx"
import SoundProcessor from "./SoundProcessor"

class SceneStore {
	private frame
		: number

	private canvas
		: HTMLCanvasElement

	private context
		: CanvasRenderingContext2D

	private render = (
		singleFrame: boolean = false,
	) => {
		SoundProcessor.updateWaveform()
		SoundProcessor.updateFreq()
		const { analyser, waveform } = SoundProcessor

		const bufferLength = analyser.fftSize

		const { width, height } = this.canvas
		this.context.clearRect(0, 0, width, height)
		this.context.fillStyle = "rgb(0, 0, 0)"
		this.context.fillRect(0, 0, width, height)
		this.context.lineWidth = 2
		this.context.strokeStyle = "rgb(255, 0, 0)"
		this.context.beginPath()

		const slliceWidth = width / bufferLength
		let x = 0
		for (let i = 0; i < bufferLength; i++) {
			const v = waveform[i] * 50
			const y = height / 2 + v
			if (i == 0)
				this.context.moveTo(x, y)
			else
				this.context.lineTo(x, y)
			x += slliceWidth
		}
		this.context.lineTo(width, height / 2)
		this.context.stroke()

		if (!singleFrame)
			this.frame = requestAnimationFrame(() => this.render())
	}

	useCanvas = (
		canvas: null | HTMLCanvasElement,
	) => {
		if (!canvas)
			return

		this.canvas = canvas
		this.context = this.canvas.getContext("2d")!
	}

	startRender = () => {
		this.frame = requestAnimationFrame(() => this.render(false))
	}

	stopRender = () => {
		cancelAnimationFrame(this.frame)
	}

	updateFrame = () => {
		this.render(true)
	}
}

export default
new SceneStore()