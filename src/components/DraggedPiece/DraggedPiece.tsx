import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface DraggedPieceProps {
	$positionX: number;
	$positionY: number;
}

const MovingPiece = styled.img.attrs<DraggedPieceProps>(
	({ $positionX, $positionY }) => ({
		style: {
			left: `${$positionX - 25}px`,
			top: `${$positionY - 25}px`,
		},
	})
)`
	position: absolute;
	width: 50px;
	height: 50px;
	pointer-events: none;
`;

export const DraggedPiece = () => {
	const dispatch = useAppDispatch();

	const {
		name: piece,
		rank,
		file,
	} = useAppSelector(state => state.draggedPiece);
	const [piecePosition, setPiecePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: MouseEvent) => {
		const board = document.getElementById('ChessBoard');
		if (!board) return;
		const { top, bottom, left, right } = board.getBoundingClientRect();

		const mouseX = e.clientX;
		const mouseY = e.clientY;

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

		setPiecePosition({ x: newX, y: newY });
	};

	const handleMouseUp = () => {
		if (!piece) return;

		dispatch(setDraggedPiece({ name: '', rank, file }));

		const pieceImage = document.getElementById(`rank${rank},file${file}`);

		if (pieceImage) {
			pieceImage.style.display = 'block';
		}
	};

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	if (!piece) return null;

	return (
		<MovingPiece
			$positionX={piecePosition.x}
			$positionY={piecePosition.y}
			src={require(`../../assets/${piece}.png`)}
		/>
	);
};
