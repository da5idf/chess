import styled from 'styled-components';
import { pieces } from '../../assets/pieces';

type Props = {
	piece: string;
	isDark: boolean;
	onMouseDown: () => void;
	onMouseUp: () => void;
};

const StyledSquare = styled.div<{ isDark: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	background-color: ${({ isDark }) => (isDark ? 'green' : 'white')};
`;

export const Square = ({ piece, isDark, onMouseDown, onMouseUp }: Props) => {
	return (
		<StyledSquare
			isDark={isDark}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<img src={pieces[piece]} />
		</StyledSquare>
	);
};
