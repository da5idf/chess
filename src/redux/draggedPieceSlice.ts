import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DraggedPieceState {
	name: string;
	rank: number | null;
	file: number | null;
}

const initialState: DraggedPieceState = {
	name: '',
	rank: null,
	file: null,
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
