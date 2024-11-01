import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import * as Presenter from './StyledComponents';
import { Piece } from './Piece';
import { useMousePosition } from '../../hooks/useMousePosition';
import { Squares } from './Squares';

export const ChessBoard = React.forwardRef<HTMLDivElement>((_, ref) => {
	const board = useAppSelector(state => state.game.board);
	const draggedPiece = useAppSelector(state => state.draggedPiece);

	const { mouseX, mouseY } = useMousePosition();

	return (
		<Presenter.Container>
			<Squares />
			{board.map((row, rank) => {
				return row.map((piece, file) => {
					let positionX = 0;
					let positionY = 0;
					let isDraggedPiece = false;
					if (draggedPiece.rank === rank && draggedPiece.file === file) {
						positionX = mouseX;
						positionY = mouseY;
						isDraggedPiece = true;
					}
					return (
						<Piece
							key={`piece-${rank}-${file}`}
							piece={piece}
							rank={rank}
							file={file}
							dragActive={!!draggedPiece.name}
							positionX={positionX}
							positionY={positionY}
							isDraggedPiece={isDraggedPiece}
						/>
					);
				});
			})}
		</Presenter.Container>
	);
});
