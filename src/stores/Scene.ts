import {} from "mobx"
import SoundProcessor from "./SoundProcessor"
import { VisualModel } from "models/components"

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

		const { width, height } = this.canvas
		this.context.clearRect(0, 0, width, height)
		this.context.fillStyle = "rgb(0, 0, 0)"
		this.context.fillRect(0, 0, width, height)
		
		this.visual.components.forEach(component => {
			component.render(this.context, SoundProcessor.analyser.fftSize)
		})

		if (!singleFrame)
			this.frame = requestAnimationFrame(() => this.render())
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