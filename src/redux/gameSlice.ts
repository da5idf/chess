import { initialBoard, Piece } from '../logic';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface GameState {
	piece: string;
	squareSize: number;
	board: Piece[][];
}

const initialState = {
	draggedPiece: { piece: '', rank: null, file: null },
	board: initialBoard,
	squareSize: 80,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		updateSquare: (
			state,
			action: PayloadAction<{ rank: number; file: number }>
		) => {
			state.board[action.payload.rank][action.payload.file] = {
				color: '',
				name: '',
			};
		},
	},
});

export const { updateSquare } = gameSlice.actions;

export default gameSlice.reducer;
