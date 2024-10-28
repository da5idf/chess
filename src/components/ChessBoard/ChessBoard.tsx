import { useState } from 'react';

import { ChessBoardGrid, DraggedPiece } from './StyledComponents';
import { getActiveSquare, hoverPiece, initialBoard } from '../../logic';
import { handleMouseMove } from './helpers';
import { Square } from '../Square';

type Props = {};

export function ChessBoard({}: Props) {
	const [boardState, setBoardState] = useState<string[][]>(initialBoard);
	const [prevBoardState, setPrevBoardState] = useState<string[][]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [draggedPiece, setDraggedPiece] = useState<string>('');

	const handleMouseDown = ({ piece, row, col }) => {
		console.log('BOARD STATE', boardState[6]);
		setDraggedPiece(piece);
		setPrevBoardState(boardState);

		const tempBoardState = boardState.map(row => [...row]);
		tempBoardState[row][col] = '';
		setBoardState(tempBoardState);
	};

	const handleMouseUp = () => {
		setBoardState(prevBoardState);
	};

	return (
		<ChessBoardGrid
			id="ChessBoard"
			// onMouseDown={e => getActiveSquare(e, setActiveSquare)}
			// onMouseMove={e => handleMouseMove(e, setMousePosition)}
		>
			{/* <DraggedPiece positionX={} /> */}
			{boardState.map((row, rowIndex) => {
				return row.map((piece, colIndex) => {
					const isDark = (rowIndex + colIndex) % 2 === 1;
					return (
						<Square
							key={`${rowIndex}-${colIndex}`}
							piece={piece}
							isDark={isDark}
							onMouseDown={() =>
								handleMouseDown({ piece, row: rowIndex, col: colIndex })
							}
							onMouseUp={handleMouseUp}
						/>
					);
				});
			})}
		</ChessBoardGrid>
	);
}
