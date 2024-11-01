import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import { ChessBoardGrid } from './StyledComponents';
import { Square } from '../Square/Square';

export const ChessBoard = React.forwardRef<HTMLDivElement>((_, ref) => {
	const board = useAppSelector(state => state.game.board);
	const draggedPiece = useAppSelector(state => state.draggedPiece);

	const inDrag = !!draggedPiece.name;

	return (
		<ChessBoardGrid id="ChessBoard" ref={ref}>
			{board.map((row, rank) => {
				return row.map((piece, file) => {
					const isDark = (rank + file) % 2 === 1;
					const isDraggedPiece =
						draggedPiece.rank === rank && draggedPiece.file === file;

					return (
						<Square
							key={`${rank}-${file}`}
							rank={rank}
							file={file}
							piece={piece}
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
