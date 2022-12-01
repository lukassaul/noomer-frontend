import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
`;

export const SocialShareContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0;

  >* {
    padding-left: 8px !important;
  };

  @media screen and (max-width: 480px) {
    padding: 0 6px;
  }
`

export const StepContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const StepImageContainer = styled.div`
  width: 25%;
  margin-bottom: 0;
  @media screen and (max-width: 480px) {
    width: 100%;
    margin-bottom: 1em;
  }
`;
