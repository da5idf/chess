import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import { ChessBoardGrid } from './StyledComponents';
import { initialBoard } from '../../logic';
import { Square } from '../Square';

type Props = {};

export function ChessBoard({}: Props) {
	const [boardState, setBoardState] = useState<string[][]>(initialBoard);

	const piece1 = useAppSelector(state => state.game.piece);
	console.log({ piece1 });

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
		</ChessBoardGrid>
	);
}
