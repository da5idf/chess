import styled from 'styled-components';

export const ChessBoardGrid = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(8, 50px);
	width: fit-content;
`;

type DraggedPieceProps = {
	$positionX: number;
	$positionY: number;
};

export const DraggedPiece = styled.img<DraggedPieceProps>`
	position: absolute;
	width: 50px;
	height: 50px;
	left: ${({ $positionX }) => $positionX - 25}px;
	top: ${({ $positionY }) => $positionY - 25}px;
	pointer-events: none;
`;
