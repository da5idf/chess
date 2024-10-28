type MouseDownProps = {
	piece: string;
	row: number;
	col: number;
	boardState: string[][];
	setDraggedPiece: React.Dispatch<React.SetStateAction<string>>;
	setPrevBoardState: React.Dispatch<React.SetStateAction<string[][]>>;
	setBoardState: React.Dispatch<React.SetStateAction<string[][]>>;
};

export const handleMouseDown = ({
	piece,
	row,
	col,
	boardState,
	setDraggedPiece,
	setPrevBoardState,
	setBoardState,
}: MouseDownProps) => {
	setDraggedPiece(piece);
	setPrevBoardState(boardState);

	const tempBoardState = boardState.map(row => [...row]);
	tempBoardState[row][col] = '';
	setBoardState(tempBoardState);
};

export const handleMouseUp = ({
	setBoardState,
	boardState: prevBoardState,
	setDraggedPiece,
}: Pick<
	MouseDownProps,
	'setBoardState' | 'boardState' | 'setDraggedPiece'
>) => {
	console.log('HERE!');
	setDraggedPiece('');
	setBoardState(prevBoardState);
};
