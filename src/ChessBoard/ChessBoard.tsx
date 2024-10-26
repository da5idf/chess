import { useRef, useEffect } from 'react';

import { ChessBoardGrid } from './StyledComponents';
import { drawBoard, getPiece } from '../logic';

type Props = {};

export function ChessBoard({}: Props) {
	const squares = drawBoard();
	const boardRef = useRef<HTMLDivElement>();

	useEffect(() => {
		if (boardRef.current) {
			// won't work because the target is the baord div, not the piece
			boardRef.current.addEventListener('click', getPiece);
		}
	});

	return (
		<ChessBoardGrid id="ChessBoard" ref={boardRef}>
			{squares}
		</ChessBoardGrid>
	);
}
