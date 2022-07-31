import React, {FocusEventHandler, useState} from "react";
import "./FlipCard.sass"
import classNames from "classnames";

const FlipCard: React.FC<{ idx: number, card: { front: React.ReactNode, back: React.ReactNode }, start: number}> = ({ idx, card, start }) => {
	const [showBack, setShowBack] = useState(false);

	const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
		if (e.target.classList.contains("social-link")) return
		setShowBack(true)
	}
	const handleBlur = () => setShowBack(false)

	return (
		<div tabIndex={start+idx} className="flip-card-outer" onFocus={handleFocus} onBlur={handleBlur}>
			<div className={classNames("flip-card-inner", { showBack })}>
				<div className="front">
					{card.front}
				</div>
				<div className="back">
					{card.back}
				</div>
			</div>
		</div>
	);
}

export default FlipCard;
