import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import React from 'react';

type Props = {
	rank: number;
	file: number;
	piece: string;
	dragActive: boolean;
	isDraggedPiece: boolean;
	positionX: number;
	positionY: number;
};

interface MovementProps {
	$positionX: number;
	$positionY: number;
}

interface PieceProps extends MovementProps {
	$hasPiece: boolean;
	$dragActive: boolean;
	$isDraggedPiece: boolean;
	$imgUrl: string;
}

const StyledPiece = styled.div.attrs<PieceProps>(
	({ $positionX, $positionY }) => ({
		style: {
			left: `${$positionX}px`,
			top: `${$positionY}px`,
		},
	})
)<PieceProps>`
	position: absolute;
	z-index: ${props => (props.$isDraggedPiece ? 100 : 1)};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
	cursor: ${props =>
		props.$dragActive ? 'grabbing' : props.$hasPiece ? 'grab' : 'default'};
	background-image: url(${props => props.$imgUrl});
	background-size: cover;
`;

export const Piece = React.memo(
	({
		rank,
		file,
		piece,
		dragActive,
		isDraggedPiece,
		positionX,
		positionY,
	}: Props) => {
		console.log('SQUARE!');
		const dispatch = useAppDispatch();

		const handleMouseDown = (e: React.MouseEvent, piece: string) => {
			if (e.button !== 0) {
				e.preventDefault();
				return;
			}
			dispatch(setDraggedPiece({ name: piece, rank, file }));
		};

		const imgUrl = piece ? require(`../../assets/${piece}.png`) : '';

		return (
			<StyledPiece
				data-rank={rank}
				data-file={file}
				onMouseDown={e => handleMouseDown(e, piece)}
				onContextMenu={e => e.preventDefault()}
				$hasPiece={!!piece}
				$dragActive={dragActive}
				$isDraggedPiece={isDraggedPiece}
				$imgUrl={imgUrl}
				$positionX={isDraggedPiece ? positionX - 100 : file * 80}
				$positionY={isDraggedPiece ? positionY - 100 : rank * 80}
			/>
		);
	}
);
