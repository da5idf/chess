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
	width: 50px;
	height: 50px;
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

	const {
		name: piece,
		rank,
		file,
	} = useAppSelector(state => state.draggedPiece);

	const handleMouseUp = () => {
		if (!piece) return;

		const squares = document.getElementsByClassName('square');
		for (let i = 0; i < squares.length; i++) {
			const square = squares[i];
			square.classList.remove('drag-active');
		}

		dispatch(setDraggedPiece({ name: '', rank, file }));

		const pieceImage = document.getElementById(`rank${rank},file${file}`);

		if (pieceImage) {
			pieceImage.style.display = 'block';
		}
	};

	useEffect(() => {
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	const { mouseX, mouseY } = useMousePosition();

	const board = gameBoardRef.current;
	if (!board) return;
	const { top, bottom, left, right } = board?.getBoundingClientRect();

	let newX: number;
	let newY: number;

	if (mouseX < left) {
		newX = left;
	} else if (mouseX > right - 50) {
		newX = right - 50;
	} else {
		newX = mouseX;
	}

	if (mouseY < top) {
		newY = top;
	} else if (mouseY > bottom - 50) {
		newY = bottom - 50;
	} else {
		newY = mouseY;
	}

	const highlightFile = Math.floor((newX - left) / 50);
	const highlightRank = Math.floor((newY - top) / 50);

	newX = left + highlightFile * 50;
	newY = top + highlightRank * 50;

	if (!piece) return null;

	return <Highlight $positionX={newX} $positionY={newY} />;
};
