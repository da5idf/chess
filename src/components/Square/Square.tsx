import styled from 'styled-components';
import { pieces } from '../../assets/pieces';

type Props = {
	rank: number;
	file: number;
	piece: string;
	isDark: boolean;
	onMouseDown: () => void;
};

const StyledSquare = styled.div<{ $isDark: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	background-color: ${props => (props.$isDark ? 'green' : 'lightgray')};
`;

export const Square = ({ rank, file, piece, isDark, onMouseDown }: Props) => {
	return (
		<StyledSquare
			data-rank={rank}
			data-file={file}
			$isDark={isDark}
			onMouseDown={onMouseDown}
		>
			<img src={pieces[piece]} />
		</StyledSquare>
	);
};
