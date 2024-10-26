import styled from 'styled-components';

export const ChessBoardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	width: 400px;
	height: 400px;

	> .square {
		background-position: center;
	}

	> .square.dark {
		background-color: grey;
	}

	// Kings
	> .lk {
		background-image: url('/pieces/lightKing.svg');
	}
	> .dk {
		background-image: url('/pieces/darkKing.svg');
	}

	// Queens
	> .lq {
		background-image: url('/pieces/lightQueen.svg');
	}
	> .dq {
		background-image: url('/pieces/darkQueen.svg');
	}

	// Bishops
	> .lb {
		background-image: url('/pieces/lightBishop.svg');
	}
	> .db {
		background-image: url('/pieces/darkBishop.svg');
	}

	// Knights
	> .ln {
		background-image: url('/pieces/lightKnight.svg');
	}
	> .dn {
		background-image: url('/pieces/darkKnight.svg');
	}

	// Rooks
	> .lr {
		background-image: url('/pieces/lightRook.svg');
	}
	> .dr {
		background-image: url('/pieces/darkRook.svg');
	}

	// Pawns
	> .lp {
		background-image: url('/pieces/lightPawn.svg');
	}
	> .dp {
		background-image: url('/pieces/darkPawn.svg');
	}
`;
