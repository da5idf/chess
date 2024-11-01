import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setDraggedPiece } from '../../redux/draggedPieceSlice';
import React from 'react';

type Props = {
	rank: number;
	file: number;
	piece: string;
	isDark: boolean;
	inDrag: boolean;
	isDraggedPiece: boolean;
};

const StyledSquare = styled.div<{
	$isDark: boolean;
	$hasPiece: boolean;
	$inDrag: boolean;
	$imgUrl: string;
	$size: number;
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
	background-color: ${props =>
		props.$isDark ? 'rgb(115,149,82)' : 'rgb(235,236,208)'};
	user-select: none;
	cursor: ${props =>
		props.$inDrag ? 'grabbing' : props.$hasPiece ? 'grab' : 'default'};

	background-image: ${props => `url(${props.$imgUrl})`};
	background-size: cover;
`;

export const Square = React.memo(
	({ rank, file, piece, isDark, inDrag, isDraggedPiece }: Props) => {
		console.log('SQUARE!');
		const dispatch = useAppDispatch();
		const SQUARE_SIZE = useAppSelector(state => state.game.squareSize);

		const handleMouseDown = (e: React.MouseEvent, piece: string) => {
			if (e.button !== 0) {
				e.preventDefault();
				return;
			}
			dispatch(setDraggedPiece({ name: piece, rank, file }));
		};

		let imgUrl;
		if (piece && !isDraggedPiece) {
			imgUrl = require(`../../assets/${piece}.png`);
		} else {
			imgUrl = '';
		}

		return (
			<StyledSquare
				data-rank={rank}
				data-file={file}
				$isDark={isDark}
				$hasPiece={!!piece}
				$inDrag={inDrag}
				$imgUrl={imgUrl}
				$size={SQUARE_SIZE}
				onMouseDown={e => handleMouseDown(e, piece)}
				onContextMenu={e => e.preventDefault()}
			/>
		);
	}
);
