export interface Piece {
	color: string;
	name: string;
}

const emptySquare = {
	color: '',
	name: '',
};

export const initialBoard: Piece[][] = [
	[
		{ color: 'dark', name: 'Rook' },
		{ color: 'dark', name: 'Knight' },
		{ color: 'dark', name: 'Bishop' },
		{ color: 'dark', name: 'Queen' },
		{ color: 'dark', name: 'King' },
		{ color: 'dark', name: 'Bishop' },
		{ color: 'dark', name: 'Knight' },
		{ color: 'dark', name: 'Rook' },
	],
	[
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
		{ color: 'dark', name: 'Pawn' },
	],
	Array(8).fill({ ...emptySquare }),
	Array(8).fill({ ...emptySquare }),
	Array(8).fill({ ...emptySquare }),
	Array(8).fill({ ...emptySquare }),
	[
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
		{ color: 'light', name: 'Pawn' },
	],
	[
		{ color: 'light', name: 'Rook' },
		{ color: 'light', name: 'Knight' },
		{ color: 'light', name: 'Bishop' },
		{ color: 'light', name: 'Queen' },
		{ color: 'light', name: 'King' },
		{ color: 'light', name: 'Bishop' },
		{ color: 'light', name: 'Knight' },
		{ color: 'light', name: 'Rook' },
	],
];
