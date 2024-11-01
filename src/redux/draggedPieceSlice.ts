import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DraggedPieceState {
	name: string;
	rank: number;
	file: number;
}

const initialState: DraggedPieceState = {
	name: '',
	rank: -1,
	file: -1,
};

export const draggedPieceSlice = createSlice({
	name: 'draggedPiece',
	initialState,
	reducers: {
		setDraggedPiece: (state, action: PayloadAction<DraggedPieceState>) => {
			const { name, rank, file } = action.payload;
			state.name = name;
			state.rank = rank;
			state.file = file;
		},
	},
});

export const { setDraggedPiece } = draggedPieceSlice.actions;

export default draggedPieceSlice.reducer;
