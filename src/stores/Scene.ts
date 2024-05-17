import {} from "mobx"
import SoundProcessor from "./SoundProcessor"
import { VisualModel } from "models/components"

class SceneStore {
	private fps
		: number
		= 60

	private interval
		: number
		= 1000 / this.fps

	private lastUpdate?
		: number
		= undefined

	private frame
		: number

	private canvas
		: HTMLCanvasElement

	private context
		: CanvasRenderingContext2D

	private renderLoop = () => {
		SoundProcessor.updateWaveform()
		SoundProcessor.updateFreq()

		const { width, height } = this.canvas
		this.context.clearRect(0, 0, width, height)
		this.context.fillStyle = "rgb(0, 0, 0)"
		this.context.fillRect(0, 0, width, height)
		
		this.visual.components.forEach(component => {
			component.render(this.context, SoundProcessor.analyser.fftSize)
		})
	}

	private render = (
		timestamp: number,
		singleFrame: boolean = false,
	) => {
		if (singleFrame) {
			this.renderLoop()
		} else {
			if (!this.lastUpdate)
				this.lastUpdate = timestamp

			const delta = timestamp - this.lastUpdate

			if (delta > this.interval) {
				this.lastUpdate = timestamp - (delta % this.interval)
				this.renderLoop()
			}

			this.frame = requestAnimationFrame(this.render)
		}
	}

	readonly visual
		= VisualModel.create({})

	useCanvas = (
		canvas: null | HTMLCanvasElement,
	) => {
		if (!canvas)
			return

		this.canvas = canvas
		this.context = this.canvas.getContext("2d")!
	}

	startRender = () => {
		this.frame = requestAnimationFrame(this.render)
	}

	stopRender = () => {
		cancelAnimationFrame(this.frame)
	}

	updateFrame = () => {
		this.render(0, true)
	}
}

export default
new SceneStore()