import styled from 'styled-components';

export const Wrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 700;
	width: inherit;
	outline: 0;
`;

export const Backdrop = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 500;
`;

export const StyledModal = styled.div`
	z-index: 100;
	// background: white;
	// position: relative;
	// margin: auto;
	// border-radius: 8px;
	width: 320px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	color: #000;
	text-align: center;
	border-radius: 20px;
	padding: 2em;
`;

export const Header = styled.div`
	width: 100%;
	border-radius: 8px 8px 0 0;
	display: flex;
	justify-content: space-between;
	padding: 0.3rem 0.3rem 1rem;
`;

export const HeaderText = styled.div`
	align-self: center;
	color: #6e6f70;
`;

export const CloseButton = styled.button`
	font-size: 0.8rem;
	font-weight: bold;
	border: none;
	border-radius: 3px;
	margin-left: 0.5rem;
	background: none;
	:hover {
		cursor: pointer;
	}
`;

export const Content = styled.div`
	padding: 10px;
	max-height: 30rem;
	overflow-x: hidden;
	overflow-y: auto;
`;
