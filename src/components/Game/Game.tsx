import styled from 'styled-components';

import { ChessBoard } from '../ChessBoard';
import { DraggedPiece } from '../DraggedPiece';

const GameContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: slategray;
	width: fit-content;
	padding: 4rem;
`;

export const Game = () => {
	return (
		<GameContainer>
			<ChessBoard />
			<DraggedPiece />
		</GameContainer>
	);
};
