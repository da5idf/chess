import styled from 'styled-components';

import { ChessBoard } from '../ChessBoard';
import { DraggedPiece } from '../DraggedPiece';
import { useRef } from 'react';
import { HighlightedSquare } from '../HighlightedSqure';

const GameContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: slategray;
	width: fit-content;
	padding: 4rem;
`;

export const Game = () => {
	const gameBoardRef = useRef<HTMLDivElement>(null);

	return (
		<GameContainer>
			<ChessBoard ref={gameBoardRef} />
			<DraggedPiece gameBoardRef={gameBoardRef} />
			<HighlightedSquare gameBoardRef={gameBoardRef} />
		</GameContainer>
	);
};
