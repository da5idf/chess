import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setDraggedPiece } from '../../redux/draggedPieceSlice';

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
	console.log('SQUARE!');
	const dispatch = useAppDispatch();

	const handleMouseDown = (e: React.MouseEvent, piece: string) => {
		dispatch(setDraggedPiece({ name: piece, rank, file }));

		const pieceImage = document.getElementById(`rank${rank},file${file}`);

		if (pieceImage) {
			pieceImage.style.display = 'none';
		}
	};

	return (
		<StyledSquare
			data-rank={rank}
			data-file={file}
			$isDark={isDark}
			onMouseDown={e => handleMouseDown(e, piece)}
		>
			{piece && (
				<img
					id={`rank${rank},file${file}`}
					src={require(`../../assets/${piece}.png`)}
					width="45px"
					height="45px"
				/>
			)}
		</StyledSquare>
	);
};
