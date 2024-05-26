import React from "react"
import { createPortal } from "react-dom"
import { observer } from "mobx-react"

import "styles/views/editor/components/reactor"
import Reactor from "stores/Reactor"
import { IReactorRode } from "models/reactor/rodes"
import SmallButton from "components/Buttons/Small"

export interface ReactorViewProps {

}

export interface ReactorViewState {

}

@observer
export default
class ReactorView
extends React.Component<ReactorViewProps, ReactorViewState> {
	componentDidMount(): void {
		document.addEventListener("keydown", this.handleEscape)	
	}

	componentWillUnmount(): void {
		document.removeEventListener("keydown", this.handleEscape)
	}

	handleEscape = (
		event: KeyboardEvent,
	) => {
		if (event.key == "Escape")
			Reactor.model.setAttachableRode()
	}

	getRodeComponent = (
		rode: IReactorRode,
	): React.ReactNode => {
		switch (rode.type) {
			case "peak":
				return null
			default:
				return null
		}
	}

	render() {
		const { model: reactor } = Reactor
		const attachableRode = reactor.attachableRode
			? reactor.getRodeById(reactor.attachableRode)
			: undefined

		return <>
			{attachableRode &&
				createPortal(
					<div className="label rode">
						<i className="fas fa-atom" />
						<strong>
							{attachableRode.type}
						</strong>
					</div>,
					document.getElementById("cursorPin")!,
				)
			}
			<div className="c-reactor">
				<h2>
					<i className="fas fa-atom" />
					<span>
						Reactor
					</span>
				</h2>
				<div className="rodes-list-wrapper">
					<div className="rodes-list">
						{reactor.rodes.map(rode => {
							const isAttaching = rode.id == reactor.attachableRode

							return <section
								key={rode.id}
								className={`${isAttaching ? "attaching" : ""}`}
							>
								<header>
									<h3>{rode.type}</h3>
									<div className="actions">
										<SmallButton
											iconOnly
											onClick={() => isAttaching
												? reactor.setAttachableRode()
												: reactor.setAttachableRode(rode.id)
											}
										>
											<i className="fas fa-link" />
										</SmallButton>
										<SmallButton
											iconOnly
											onClick={() => reactor.removeRode(rode)}
										>
											<i className="fas fa-trash-alt" />
										</SmallButton>
									</div>
								</header>
								<div className="content">
									{this.getRodeComponent(rode)}
								</div>
							</section>
						})}
						<div
							className="add-rode"
							onClick={() => reactor.addRode("peak")}
						>
							<i className="fas fa-plus" />
							<span>
								Add Rode
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	}
}