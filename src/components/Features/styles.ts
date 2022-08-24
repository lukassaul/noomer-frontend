import styled from 'styled-components';

export const MainFlexContainer = styled.div`
  width: 100%;
`;

export const MainFlexContainerRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 4px;
`;

export const MainFlexContainerColumn = styled.div`
  flex: 30%;
  max-width: 30%;
  padding: 0 4px;
  @media screen and (max-width: 800px) {
    flex: 50%;
    max-width: 50%;
  }
  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

export const MainFlexChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  padding: 2em;
`;
