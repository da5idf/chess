import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import draggedPieceReducer from './draggedPieceSlice';

export const store = configureStore({
	reducer: {
		game: gameReducer,
		draggedPiece: draggedPieceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
