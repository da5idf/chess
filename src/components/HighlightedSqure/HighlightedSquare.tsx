import { useAppSelector } from '../../hooks/reduxHooks';
import { RefObject } from 'react';
import styled from 'styled-components';
import { useMousePosition } from '../../hooks/useMousePosition';

interface HighlightedSquareProps {
	$positionX: number;
	$positionY: number;
	$size: number;
}

const Highlight = styled.div.attrs<HighlightedSquareProps>(
	({ $positionX, $positionY }) => ({
		style: {
			left: `${$positionX}px`,
			top: `${$positionY}px`,
		},
	})
)`
	position: absolute;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
	top: 0;
	left: 0;
	outline: 4px solid lightgray;
	outline-offset: -4px;
`;

type Props = {
	gameBoardRef: RefObject<HTMLDivElement>;
};

export const HighlightedSquare = ({ gameBoardRef }: Props) => {
	const SQUARE_SIZE = useAppSelector(state => state.game.squareSize);
	const { name: piece } = useAppSelector(state => state.draggedPiece);

	const { mouseX, mouseY } = useMousePosition();

	const board = gameBoardRef.current;
	if (!board) return;
	const { top, bottom, left, right } = board?.getBoundingClientRect();

	let newX: number;
	let newY: number;

	if (mouseX < left) {
		newX = left;
	} else if (mouseX > right - SQUARE_SIZE) {
		newX = right - SQUARE_SIZE;
	} else {
		newX = mouseX;
	}

	if (mouseY < top) {
		newY = top;
	} else if (mouseY > bottom - SQUARE_SIZE) {
		newY = bottom - SQUARE_SIZE;
	} else {
		newY = mouseY;
	}

	const highlightFile = Math.floor((newX - left) / SQUARE_SIZE);
	const highlightRank = Math.floor((newY - top) / SQUARE_SIZE);

	newX = left + highlightFile * SQUARE_SIZE;
	newY = top + highlightRank * SQUARE_SIZE;

	if (!piece) return null;

	return (
		<Highlight
			data-rank={highlightRank}
			data-file={highlightFile}
			$positionX={newX}
			$positionY={newY}
			$size={SQUARE_SIZE}
		/>
	);
};
