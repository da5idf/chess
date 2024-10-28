export const hoverPiece = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	square: HTMLDivElement | null
) => {
	const x = e.clientX;
	const y = e.clientY;

	console.log({ x, y });
};
