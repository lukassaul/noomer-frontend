import styled from 'styled-components';


export const WhatIsContainerTitle = styled.div`
    margin-bottom: -10px;
    display: flex;
    justify-content: center;
`;

export const WhatIsTitle = styled.p`
    font-size: 32px;
    font-weight: 600;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

export const StatsTable = styled.div`
  width: 40%;
  padding: 1em;
  flex-direction: row;
  @media screen and (max-width: 1020px) {
    width: 100%;
    padding: 0.5em;
  }
`;
