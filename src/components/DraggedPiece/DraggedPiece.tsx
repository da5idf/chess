import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RefObject, useEffect } from 'react';
import styled from 'styled-components';
import { useMousePosition } from '../../hooks/useMousePosition';

interface DraggedPieceProps {
	$positionX: number;
	$positionY: number;
	$size: number;
}

const MovingPiece = styled.img.attrs<DraggedPieceProps>(
	({ $positionX, $positionY, $size }) => ({
		style: {
			left: `${$positionX - $size / 2}px`,
			top: `${$positionY - $size / 2}px`,
		},
	})
)`
	position: absolute;
	z-index: 100;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
	pointer-events: none;
`;

type Props = {
	gameBoardRef: RefObject<HTMLDivElement>;
};

export const DraggedPiece = ({ gameBoardRef }: Props) => {
	const dispatch = useAppDispatch();

	const { name: piece } = useAppSelector(state => state.draggedPiece);
	const SQUARE_SIZE = useAppSelector(state => state.game.squareSize);

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
	if (!board) return;
	const { top, bottom, left, right } = board?.getBoundingClientRect();

	let newX: number;
	let newY: number;

	if (mouseX < left) {
		newX = left;
	} else if (mouseX > right) {
		newX = right;
	} else {
		newX = mouseX;
	}

	if (mouseY < top) {
		newY = top;
	} else if (mouseY > bottom) {
		newY = bottom;
	} else {
		newY = mouseY;
	}

	if (!piece) return null;

	return (
		<MovingPiece
			$positionX={newX}
			$positionY={newY}
			$size={SQUARE_SIZE}
			src={require(`../../assets/${piece}.png`)}
		/>
	);
};
