import { Piece } from '.';

export const isValidMove = (
	e: MouseEvent,
	color: string,
	piece: string,
	board: Piece[][]
) => {
	const targetSquare = e.target;
	if (!(targetSquare instanceof HTMLElement)) {
		return;
	}

	const targetRank = targetSquare.dataset.rank;
	const targetFile = targetSquare.dataset.file;

	if (!targetFile || !targetRank) return false;

	const targetPiece = board[Number(targetRank)][Number(targetFile)];

	console.log({ targetPiece, colorMatch: color === targetPiece.color });

	return true;
};
