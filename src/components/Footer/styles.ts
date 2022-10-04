import styled from 'styled-components';


export const FooterContainer = styled.div`
  //max-width: 1280px;
  width: 100%;
  min-height: 270px;
  margin-right: auto;
  margin-left: auto;
  border-top: 2px solid;
  background-color: #4C5055;
  color: #FFFFFF;
`;

export const LinksContainer = styled.div`
  //max-width: 1280px;
  width: 100%;
  min-height: 225px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 480px) {
    flex-direction:  column;
    justify-content: flex-start;
    align-items: initial;
    margin: 0 1em;
  }
`;

export const CopyrightContainer = styled.div`
  //max-width: 1280px;
  width: 100%;
  min-height: 45px;
  margin-right: auto;
  margin-left: auto;
  background-color: #DADADA;
  color: #53585F;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  > * {
    margin: 8px 0;
    justify-content: space-between
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    flex-direction:  row;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0 0 0;
    font-size: 14px;
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  > * {
    margin: 8px 0;
    justify-content: space-between
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    flex-direction:  row;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0 0 0;
    font-size: 14px;
  }
`;

export const DailaiText = styled.p`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 0.5em;
`;

export const LinkCategory = styled.p`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

export const LogoSocialLinksContainer = styled.div`
  width: 40%; /* additionally, equal width */
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
