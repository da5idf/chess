import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import { ChessBoardGrid } from './StyledComponents';
import { Square } from '../Square';
import { DraggedPiece } from '../DraggedPiece';

type Props = {};

export function ChessBoard({}: Props) {
	const piece1 = useAppSelector(state => state.draggedPiece.name);
	const board = useAppSelector(state => state.game.board);

	const [boardState, setBoardState] = useState<string[][]>(board);

	console.log({ piece1, rook: boardState[7] && boardState[7][7] });

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
