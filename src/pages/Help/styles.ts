import styled from 'styled-components';


export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FlexCenterRowContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const FlexCenterRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

export const HalfDiv = styled.div`
  width: 60%;
  padding: 4rem;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 2rem;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
`;

export const HalfDivLightGray = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  padding: 4rem;
  background-color: #F3F3F3;
  border: 1px solid transparent;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 2rem;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
  &:hover {
    border: 1px solid #c1bbbb;
  }
`;

export const HalfDivDarkGray = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  padding: 4rem;
  background-color: #EDEDED;
  border: 1px solid transparent;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 2rem;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
  &:hover {
    border: 1px solid #c1bbbb;
  }
`;

export const JustifyText = styled.p`
	margin: 1em 0;
  text-align: justify;
  line-height: 1.8;
  hyphens: auto;
  webkit-hyphens: auto;
  white-space: pre-line;
`;
