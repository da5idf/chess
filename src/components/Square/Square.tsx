import styled from 'styled-components';
import { setPiece } from '../../redux/gameSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';

type Props = {
	rank: number;
	file: number;
	piece: string;
	isDark: boolean;
};

const StyledSquare = styled.div<{ $isDark: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	background-color: ${props => (props.$isDark ? 'green' : 'lightgray')};
`;

export const Square = ({ rank, file, piece, isDark }: Props) => {
	const dispatch = useAppDispatch();

	return (
		<StyledSquare
			data-rank={rank}
			data-file={file}
			$isDark={isDark}
			onClick={() => dispatch(setPiece(piece))}
		>
			{piece && (
				<img
					src={require(`../../assets/${piece}.png`)}
					width="45px"
					height="45px"
				/>
			)}
		</StyledSquare>
	);
};
