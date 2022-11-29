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
