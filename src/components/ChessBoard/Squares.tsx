import * as Presenter from './StyledComponents';

export const Squares = () => {
	const dummyBoard = new Array(8).fill('').map(() => new Array(8).fill(''));
	return (
		<Presenter.Squares>
			{dummyBoard.map((row, rank) => {
				return row.map((_, file) => {
					const isDark = (rank + file) % 2 === 1;
					return (
						<Presenter.Square key={`board-${rank}-${file}`} $isDark={isDark} />
					);
				});
			})}
		</Presenter.Squares>
	);
};
