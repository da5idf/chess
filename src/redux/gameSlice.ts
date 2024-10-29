import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
	piece: string;
}

const initialState = {
	piece: '',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setPiece: (state, action: PayloadAction<string>) => {
			state.piece = action.payload;
		},
	},
});

export const { setPiece } = gameSlice.actions;

export default gameSlice.reducer;
