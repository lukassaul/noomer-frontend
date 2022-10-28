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

export const MainFlexContainerColumn75Right = styled.div`
  flex: 75%;
  max-width: 75%;
  padding: 0 1em 0 4em;
  @media screen and (max-width: 800px) {
    flex: 50%;
    max-width: 50%;
    padding: 0 1em;
  }
  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
    padding: 0 1em;
  }
`;

export const MainFlexContainerColumn75Left = styled.div`
  flex: 75%;
  max-width: 75%;
  padding: 0 4em 0 1em;
  @media screen and (max-width: 800px) {
    flex: 50%;
    max-width: 50%;
    padding: 0 1em;
  }
  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
    padding: 0 1em;
  }
`;

export const MainFlexContainerColumn25 = styled.div`
  flex: 25%;
  max-width: 25%;
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
  padding: 0 2em 2em 2em;
  @media screen and (max-width: 600px) {
    padding: 1em;
  }
`;

export const MainFlexChildrenContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  padding: 2em 2em 2em 1em;
  @media screen and (max-width: 600px) {
    padding: 1em;
  }
`;

export const MainFlexChildrenContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  padding: 2em 1em 2em 2em;
  @media screen and (max-width: 600px) {
    padding: 1em;
  }
`;

export const SecondImageDesktop = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const SecondImageMobile = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    display: contents;
  }
`;

export const AboutContentContainer = styled.div`
  display: flex;
  width: 75%;
  flex-direction: row;
  @media screen and (max-width: 600px) {
    width: 90%;
    flex-direction: column;
  }
`;
