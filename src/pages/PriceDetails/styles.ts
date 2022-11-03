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

export const RatingText = styled.p`
    display: contents;
    @media screen and (max-width: 480px) {
      display: none;
    }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  padding: 0 2em;
  @media screen and (max-width: 480px) {
    padding: 0 8px;;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const FlexContainerResponsive = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-direction: row;
  @media screen and (max-width: 480px) {
      flex-direction: column;
  }
`;

export const FlexBetweenRowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  @media screen and (max-width: 480px) {
      flex-direction: column;
  }
`;

export const ImageDescriptionWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-direction: row;
  width: 80%;
  @media screen and (max-width: 720px) {
      flex-direction: column;
      width: 100%;
  }
`;

export const ImageContainer = styled.div`
  padding-right: 2em;
  @media screen and (max-width: 480px) {
    padding-right: 0;
  }
`
