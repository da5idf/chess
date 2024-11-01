import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RefObject, useEffect } from 'react';
import styled from 'styled-components';
import { useMousePosition } from '../../hooks/useMousePosition';

interface HighlightedSquareProps {
	$positionX: number;
	$positionY: number;
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
	width: 80px;
	height: 80px;
	top: 0;
	left: 0;
	outline: 4px solid lightgray;
	outline-offset: -4px;
`;

type Props = {
	gameBoardRef: RefObject<HTMLDivElement>;
};

export const HighlightedSquare = ({ gameBoardRef }: Props) => {
	const dispatch = useAppDispatch();
	const SQUARE_WIDTH = 80;

	const { name: piece } = useAppSelector(state => state.draggedPiece);

	const handleMouseUp = () => {
		if (!piece) return;

		dispatch(setDraggedPiece({ name: '', rank: -1, file: -1 }));
	};

	useEffect(() => {
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	const { mouseX, mouseY } = useMousePosition();

	const board = gameBoardRef.current;
	if (!board) {
		return;
	}
	const { top, bottom, left, right } = board?.getBoundingClientRect();

	let newX: number;
	let newY: number;

	if (mouseX < left) {
		newX = left;
	} else if (mouseX > right - SQUARE_WIDTH) {
		newX = right - SQUARE_WIDTH;
	} else {
		newX = mouseX;
	}

	if (mouseY < top) {
		newY = top;
	} else if (mouseY > bottom - SQUARE_WIDTH) {
		newY = bottom - SQUARE_WIDTH;
	} else {
		newY = mouseY;
	}

	const highlightFile = Math.floor((newX - left) / SQUARE_WIDTH);
	const highlightRank = Math.floor((newY - top) / SQUARE_WIDTH);

	newX = left + highlightFile * SQUARE_WIDTH;
	newY = top + highlightRank * SQUARE_WIDTH;

	if (!piece) return null;

	return <Highlight $positionX={newX} $positionY={newY} />;
};
