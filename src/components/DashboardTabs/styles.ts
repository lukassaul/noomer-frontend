import styled from 'styled-components';

export const TableHeaderContainer = styled.div`
  display: flex;
  padding: 1em 0;
  borderBottom: 1px solid #c4c4c4;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CreatedPostContainerBig = styled.div`
  display: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CreatedPostContainerMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const CreatedPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  border-bottom: 1px solid #e5e5e5;
  width: 80%
`;
