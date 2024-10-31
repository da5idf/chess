import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setDraggedPiece } from '../../redux/draggedPieceSlice';

type Props = {
	rank: number;
	file: number;
	piece: string;
	isDark: boolean;
};

const StyledSquare = styled.div<{ $isDark: boolean; $hasPiece: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	background-color: ${props => (props.$isDark ? 'green' : 'lightgray')};
	user-select: none;
	cursor: ${props => (props.$hasPiece ? 'grab' : 'default')};

	&.drag-active {
		cursor: grabbing;
	}
`;

export const Square = ({ rank, file, piece, isDark }: Props) => {
	console.log('SQUARE!');
	const dispatch = useAppDispatch();

	const handleMouseDown = (e: React.MouseEvent, piece: string) => {
		if (e.button !== 0) {
			e.preventDefault();
			return;
		}

		const squares = document.getElementsByClassName('square');
		console.log({ squares });
		for (let i = 0; i < squares.length; i++) {
			const square = squares[i];
			square.classList.add('drag-active');
		}

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
			$hasPiece={!!piece}
			onMouseDown={e => handleMouseDown(e, piece)}
			onContextMenu={e => e.preventDefault()}
			className="square"
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
