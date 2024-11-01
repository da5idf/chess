import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import styled from 'styled-components';

import { Square } from '../Square/Square';

const ChessBoardGrid = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	width: fit-content;
`;

export const ChessBoard = React.forwardRef<HTMLDivElement>((_, ref) => {
	const board = useAppSelector(state => state.game.board);
	const draggedPiece = useAppSelector(state => state.draggedPiece);

	const inDrag = !!draggedPiece.name;
	console.log(inDrag);

	return (
		<ChessBoardGrid id="ChessBoard" ref={ref}>
			{board.map((row, rank) => {
				return row.map((piece, file) => {
					const { color, name } = piece;
					const isDark = (rank + file) % 2 === 1;
					const isDraggedPiece =
						draggedPiece.rank === rank && draggedPiece.file === file;

					return (
						<Square
							key={`${rank}-${file}`}
							rank={rank}
							file={file}
							color={color}
							pieceName={name}
							isDark={isDark}
							inDrag={inDrag}
							isDraggedPiece={isDraggedPiece}
						/>
					);
				});
			})}
		</ChessBoardGrid>
	);
});
