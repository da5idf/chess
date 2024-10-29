import { useEffect, useState } from 'react';

import { ChessBoardGrid, DraggedPiece } from './StyledComponents';
import { initialBoard } from '../../logic';
import { Square } from '../Square';
import { handleMouseDown, handleMouseUp } from './helpers/handleMouseActions';
import { pieces } from '../../assets/pieces';

type Props = {};

export function ChessBoard({}: Props) {
	const [boardState, setBoardState] = useState<string[][]>(initialBoard);
	const [prevBoardState, setPrevBoardState] = useState<string[][]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [draggedPiece, setDraggedPiece] = useState<string>('');

	const handleMouseMove = (e: MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
	};

	const handleWindowMouseUp = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const rank = target.dataset.rank || '';
		const file = target.dataset.file || '';

		const newBoardState = boardState.map(row => [...row]);
		newBoardState[Number(rank)][Number(file)] = draggedPiece;

		setDraggedPiece('');
		setBoardState(newBoardState);
	};

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleWindowMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleWindowMouseUp);
		};
	});

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
						/>
					);
				});
			})}
			{draggedPiece && (
				<DraggedPiece
					src={pieces[draggedPiece]}
					$positionX={mousePosition.x - 25}
					$positionY={mousePosition.y - 25}
				/>
			)}
		</ChessBoardGrid>
	);
}
