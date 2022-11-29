import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
`;

export const DesktopResultWrapper = styled.div`
    display: contents;
    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const MobileResultWrapper = styled.div`
    display: none;

    @media screen and (max-width: 540px) {
        display: block;
    }
`;
