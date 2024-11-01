import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setDraggedPiece } from '../../redux/draggedPieceSlice';

type Props = {
	rank: number;
	file: number;
	color: string;
	pieceName: string;
	isDark: boolean;
	inDrag: boolean;
	isDraggedPiece: boolean;
};

const StyledSquare = styled.div<{
	$isDark: boolean;
	$hasPiece: boolean;
	$inDrag: boolean;
	$imgUrl: string;
	$size: number;
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${props => props.$size}px;
	height: ${props => props.$size}px;
	background-color: ${props =>
		props.$isDark ? 'rgb(115,149,82)' : 'rgb(235,236,208)'};
	user-select: none;
	cursor: ${props =>
		props.$inDrag ? 'grabbing' : props.$hasPiece ? 'grab' : 'default'};

	background-image: ${props => `url(${props.$imgUrl})`};
	background-size: cover;
`;

export const Square = ({
	rank,
	file,
	color,
	pieceName,
	isDark,
	inDrag,
	isDraggedPiece,
}: Props) => {
	const dispatch = useAppDispatch();
	const SQUARE_SIZE = useAppSelector(state => state.game.squareSize);
	const piece = color + pieceName;

	const handleMouseDown = (e: React.MouseEvent, piece: string) => {
		if (e.button !== 0) {
			e.preventDefault();
			return;
		}
		if (piece) {
			dispatch(setDraggedPiece({ color, name: pieceName, rank, file }));
		}
	};

	let imgUrl: string;
	if (piece && !isDraggedPiece) {
		imgUrl = require(`../../assets/${piece}.png`);
	} else {
		imgUrl = '';
	}

	return (
		<StyledSquare
			$isDark={isDark}
			$hasPiece={!!piece}
			$inDrag={inDrag}
			$imgUrl={imgUrl}
			$size={SQUARE_SIZE}
			onMouseDown={e => handleMouseDown(e, piece)}
			onContextMenu={e => e.preventDefault()}
		/>
	);
};
