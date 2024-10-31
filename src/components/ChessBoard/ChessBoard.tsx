import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import { ChessBoardGrid } from './StyledComponents';
import { Square } from '../Square';
import { DraggedPiece } from '../DraggedPiece';

type Props = {};

export function ChessBoard({}: Props) {
	const board = useAppSelector(state => state.game.board);

	const [boardState, setBoardState] = useState<string[][]>(board);

	return (
		<ChessBoardGrid id="ChessBoard">
			{boardState.map((row, rowIndex) => {
				return row.map((piece, colIndex) => {
					const isDark = (rowIndex + colIndex) % 2 === 1;
					return (
						<Square
							key={`${rowIndex}-${colIndex}`}
							rank={rowIndex}
							file={colIndex}
							piece={piece}
							isDark={isDark}
						/>
					);
				});
			})}
			<DraggedPiece />
		</ChessBoardGrid>
	);
}
