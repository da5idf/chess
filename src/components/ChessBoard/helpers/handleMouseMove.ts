import { MousePosition } from '..';

export const handleMouseMove = (
	e: MouseEvent,
	setter: React.Dispatch<React.SetStateAction<MousePosition>>
) => {
	setter({
		x: e.clientX,
		y: e.clientY,
	});
};
