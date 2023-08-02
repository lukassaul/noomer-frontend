import styled from 'styled-components';
import { Container } from '../../globalStyles';

export const SelectContainer = styled.div`
  align-items: center;
  gap: 1em;
  width: 30%;
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

export const SectionContainer = styled.div`
  padding: 3em;
`;

export const DesktopResultWrapper = styled.div`
    display: block;
    width: 80%;
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

export const NoomerErrorMessage = styled.p`
    padding: 2em;
    color: #fff;
`;
