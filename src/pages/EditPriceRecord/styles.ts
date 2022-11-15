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

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  @media screen and (max-width: 480px) {
    padding-right: 0;
    padding-left: 0;
  }
`;
