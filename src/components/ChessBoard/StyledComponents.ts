import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
`;

export const Squares = styled.div`
	display: grid;
	grid-template-columns: repeat(8, 80px);
	width: fit-content;
`;

export const Square = styled.div<{ $isDark: boolean }>`
	height: 80px;
	background-color: ${props =>
		props.$isDark ? 'rgb(115,149,82)' : 'rgb(235,236,208)'};
`;
