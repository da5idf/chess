import { MousePosition } from '..';

export const handleMouseMove = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	setter: React.Dispatch<React.SetStateAction<MousePosition>>
) => {
	setter({
		x: e.clientX,
		y: e.clientY,
	});
};
