import styled from 'styled-components';

export const ChessBoardGrid = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(8, 50px);
	width: fit-content;
`;

interface DraggedPieceProps {
	$positionX: number;
	$positionY: number;
}

export const DraggedPiece = styled.img.attrs<DraggedPieceProps>(
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
	pointer-events: none;
`;
