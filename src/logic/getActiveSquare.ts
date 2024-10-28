import { getPieceFromClassList } from '.';

export const getActiveSquare = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	setActiveSquare: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
) => {
	const target = e.target;

	if (!(target instanceof HTMLDivElement)) {
		return;
	}

	setActiveSquare(target);
};
