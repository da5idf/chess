import styled from 'styled-components';

export const ChessBoardGrid = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(8, 50px);
`;

export const DraggedPiece = styled.div`
	position: absolute;
	width: 50px;
	height: 50px;
	background-color: red;
`;
