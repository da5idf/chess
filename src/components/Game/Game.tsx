import styled from 'styled-components';

import { ChessBoard } from '../ChessBoard';
import { useRef } from 'react';
import { HighlightedSquare } from '../HighlightedSqure';

const GameContainer = styled.div`
	position: relative;
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
			<HighlightedSquare gameBoardRef={gameBoardRef} />
		</GameContainer>
	);
};
