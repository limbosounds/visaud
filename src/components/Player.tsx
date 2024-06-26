import React from "react"
import { observer } from "mobx-react"

import "styles/components/player"
import SoundSource from "stores/Sound/Source"
import SoundProcessor from "stores/Sound/Processor"
import Scene from "stores/Scene"

export interface PlayerProps {

}

export interface PlayerState {
	currentTime: number
	duration: number
	paused: boolean
}

@observer
export default
class Player
extends React.Component<PlayerProps, PlayerState> {
	state
		: Readonly<PlayerState>
		= {
			currentTime: 0,
			duration: NaN,
			paused: true
		}

	source
		: null | HTMLAudioElement

	handleLoad = (
		event: React.SyntheticEvent<HTMLAudioElement>,
	) => {
		SoundProcessor.useAudio(event.currentTarget)
		event.currentTarget.volume = 1
		this.setState({
			duration: event.currentTarget.duration,
		})

		Scene.updateFrame()
	}

	handleTimeUpdate = (
		event: React.SyntheticEvent<HTMLAudioElement>
	) => {
		this.setState({
			currentTime: event.currentTarget.currentTime,
		})
		
		Scene.updateFrame()
	}

	play = () => {
		this.source?.play()
		this.setState({
			paused: false,
		})
	}

	pause = () => {
		this.source?.pause()
		this.setState({
			paused: true,
		})
	}

	render() {
		if (!SoundSource.file)
			return

		const { duration, currentTime, paused } = this.state

		return <>
			<audio
				className="c-player-source"
				ref={r => this.source = r}
				src={SoundSource.objectUrl}
				muted={false}
				controls
				onLoadedMetadata={this.handleLoad}
				onTimeUpdate={this.handleTimeUpdate}
				onPlay={Scene.startRender}
				onPause={Scene.stopRender}
			/>

			<div className="c-player">
				{paused
					? <i
						className="fas fa-play"
						onClick={this.play}
					/>
					: <i
						className="fas fa-pause"
						onClick={this.pause}
					/>
				}
				<div className="progress-n-timing">
					<div className="progress">
						<span className="total" />
						<span
							className="current"
							style={{
								width: `${currentTime / duration * 100}%`,
							}}
						/>
					</div>
					<div className="timing">
						<span>
							{currentTime.as("seconds").toTimeString()}
						</span>
						<span>
							{isNaN(duration)
								? "--:--"
								: duration.as("seconds").toTimeString()
							}
						</span>
					</div>
				</div>
			</div>
		</>
	}
}