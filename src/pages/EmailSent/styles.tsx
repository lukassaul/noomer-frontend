import styled from 'styled-components';

export const EmailSentWrapper = styled.div`
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const EmailSentContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export const EmailSentInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  text-align: center;
`;

export const EmailSentTitle = styled.h2`
  font-family: Arial;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 10px;
`;

export const EmailSentCheck = styled.p`
  font-family: Arial;
  font-weight: 400;
`;

export const EmailSentImg = styled.img`

`;

export const EmailSentDidWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin:auto;
`;

export const EmailSentDid = styled.p`
  font-family: Arial;
  font-weight: 400;
`;

export const EmailSentClick = styled.p`
  color: blue;
  font-family: Arial;
  font-weight: 400;
  cursor: pointer;
  padding-left: 2px;
`;
