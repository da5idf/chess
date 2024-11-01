import styled from 'styled-components';

import { ChessBoard } from '../ChessBoard';
import { DraggedPiece } from '../DraggedPiece';
import { useRef } from 'react';
import { HighlightedSquare } from '../HighlightedSqure';
import { useAppSelector } from '../../hooks/reduxHooks';

const GameContainer = styled.div<{ $size: number }>`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(48, 46, 43);
	width: fit-content;
	padding: ${props => props.$size}px;
`;

export const Game = () => {
	const gameBoardRef = useRef<HTMLDivElement>(null);
	const SQUARE_SIZE = useAppSelector(state => state.game.squareSize);

	return (
		<GameContainer $size={SQUARE_SIZE}>
			<ChessBoard ref={gameBoardRef} />
			<DraggedPiece gameBoardRef={gameBoardRef} />
			<HighlightedSquare gameBoardRef={gameBoardRef} />
		</GameContainer>
	);
};
