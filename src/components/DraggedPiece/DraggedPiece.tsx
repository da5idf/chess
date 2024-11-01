import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RefObject, useEffect } from 'react';
import styled from 'styled-components';
import { useMousePosition } from '../../hooks/useMousePosition';

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
	z-index: 100;
	width: 50px;
	height: 50px;
	pointer-events: none;
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

	const handleMouseUp = () => {
		if (!piece) return;

		dispatch(setDraggedPiece({ name: '', rank, file }));

		const squares = document.getElementsByClassName('square');
		for (let i = 0; i < squares.length; i++) {
			const square = squares[i];
			square.classList.remove('drag-active');
		}

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
			src={require(`../../assets/${piece}.png`)}
		/>
	);
};
