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
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
	};

	const handleMouseUp = (e: React.MouseEvent) => {
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
			$positionX={mousePosition.x}
			$positionY={mousePosition.y}
			src={require(`../../assets/${piece}.png`)}
		/>
	);
};
