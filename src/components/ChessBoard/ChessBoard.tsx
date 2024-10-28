import { useState } from 'react';

import { ChessBoardGrid, DraggedPiece } from './StyledComponents';
import { initialBoard } from '../../logic';
import { handleMouseMove } from './helpers';
import { Square } from '../Square';
import { handleMouseDown, handleMouseUp } from './helpers/handleMouseActions';
import { pieces } from '../../assets/pieces';

type Props = {};

export function ChessBoard({}: Props) {
	const [boardState, setBoardState] = useState<string[][]>(initialBoard);
	const [prevBoardState, setPrevBoardState] = useState<string[][]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [draggedPiece, setDraggedPiece] = useState<string>('');

	return (
		<ChessBoardGrid
			id="ChessBoard"
			onMouseMove={e => handleMouseMove(e, setMousePosition)}
		>
			{boardState.map((row, rowIndex) => {
				return row.map((piece, colIndex) => {
					const isDark = (rowIndex + colIndex) % 2 === 1;
					return (
						<Square
							key={`${rowIndex}-${colIndex}`}
							piece={piece}
							isDark={isDark}
							onMouseDown={() =>
								handleMouseDown({
									piece,
									row: rowIndex,
									col: colIndex,
									boardState,
									setDraggedPiece,
									setPrevBoardState,
									setBoardState,
								})
							}
							onMouseUp={() =>
								handleMouseUp({
									setBoardState,
									boardState: prevBoardState,
									setDraggedPiece,
								})
							}
						/>
					);
				});
			})}
			{draggedPiece && (
				<DraggedPiece
					src={pieces[draggedPiece]}
					$positionX={mousePosition.x}
					$positionY={mousePosition.y}
				/>
			)}
		</ChessBoardGrid>
	);
}
