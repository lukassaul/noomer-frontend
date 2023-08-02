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
	font-size: 0.9rem;
	margin-bottom: 10px;
	text-align: center;
`;

export const YesButton = styled.button`
	width: 6rem;
  background-color: #007bff;
  border-color: #007bff;
  border-style: none;
  padding: 0.5em;
  border-radius: 5px;
  color: white;
`;

export const NoButton = styled.button`
	width: 6rem;
  margin-left: 10px;
  background-color: #dc3545;
  border-color: #dc3545;
  border-style: none;
  padding: 0.5em;
  border-radius: 5px;
  color: white;
`;
