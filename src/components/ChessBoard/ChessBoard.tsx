import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import { ChessBoardGrid } from './StyledComponents';
import { Square } from '../Square';

export const ChessBoard = React.forwardRef<HTMLDivElement>((_, ref) => {
	const board = useAppSelector(state => state.game.board);

	return (
		<ChessBoardGrid id="ChessBoard" ref={ref}>
			{board.map((row, rank) => {
				return row.map((piece, file) => {
					const isDark = (rank + file) % 2 === 1;
					return (
						<Square
							key={`${rank}-${file}`}
							rank={rank}
							file={file}
							piece={piece}
							isDark={isDark}
						/>
					);
				});
			})}
		</ChessBoardGrid>
	);
});
