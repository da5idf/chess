import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RefObject, useEffect, useState } from 'react';
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

const HighlightedSquare = styled.div.attrs<DraggedPieceProps>(
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

export const DraggedPiece = ({ gameBoardRef }: Props) => {
	const dispatch = useAppDispatch();

	const {
		name: piece,
		rank,
		file,
	} = useAppSelector(state => state.draggedPiece);
	const [piecePosition, setPiecePosition] = useState({ x: 0, y: 0 });
	const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: MouseEvent) => {
		const board = gameBoardRef.current;
		if (!board) return;
		const { top, bottom, left, right } = board?.getBoundingClientRect();
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

		const highlightFile = Math.floor((newX - left) / 50);
		const highlightRank = Math.floor((newY - top) / 50);

		setHighlightPosition({
			x: left + highlightFile * 50,
			y: top + highlightRank * 50,
		});
	};

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
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	if (!piece) return null;

	return (
		<>
			<MovingPiece
				$positionX={piecePosition.x}
				$positionY={piecePosition.y}
				src={require(`../../assets/${piece}.png`)}
			/>
			<HighlightedSquare
				$positionX={highlightPosition.x}
				$positionY={highlightPosition.y}
			/>
		</>
	);
};
