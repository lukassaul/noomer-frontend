import styled from 'styled-components';

export const Wrapper = styled.div`
    width 80%;
    @media(min-width: 768px) {
    width: 60%;
    }
    @media(min-width: 1024px) {
    width: 40%;
    }
`;

export const ConfirmationButtons = styled.div`
	display: flex;
	justify-content: center;
  padding: 12px;
`;

export const Message = styled.div`
	font-size: 1.5rem;
	margin: 1rem 0;
	text-align: center;
`;

export const Content = styled.div`
	padding: 2em;
`;

export const TermTitle = styled.p`
	font-weight: bold;
`;

export const TermText = styled.p`
	margin: 1em 0;
  text-align: justify;
`;

export const PrivacySubtitle = styled.p`
	font-weight: bold;
  margin: 1em 0;
`;

export const BoldText = styled.span`
	font-weight: bold;
`;

export const YesButton = styled.button`
	width: 6rem;
`;

export const NoButton = styled.button`
	width: 6rem;
  margin-left: 10px;
`;
