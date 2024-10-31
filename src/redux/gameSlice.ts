import { initialBoard } from '../logic';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
	piece: string;
}

const initialState = {
	draggedPiece: { piece: '', rank: null, file: null },
	board: initialBoard,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		updateSquare: (
			state,
			action: PayloadAction<{ rank: number; file: number }>
		) => {
			state.board[action.payload.rank][action.payload.file] = '';
		},
	},
});

export const { updateSquare } = gameSlice.actions;

export default gameSlice.reducer;
