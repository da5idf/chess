import classNames from 'classnames';

import { initialBoard } from '../logic';

export const drawBoard = () => {
	const ROWS = initialBoard.length;
	const COLS = initialBoard[0].length;
	const squares = [];
	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLS; col++) {
			const isDark = (row + col) % 2 === 1;
			const classes = classNames({
				dark: isDark,
				light: !isDark,
				square: true,
				[initialBoard[row][col]]: true,
			});

			squares.push(<div key={`${row}-${col}`} className={classes} />);
		}
	}

	return squares;
};
