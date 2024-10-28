import { getPieceFromClassList } from '.';

export const getPiece = (e: MouseEvent) => {
	const target = e.target;

	if (!(target instanceof HTMLElement)) {
		return;
	}

	const piece = getPieceFromClassList(target.classList);

	console.log({ piece });
};
