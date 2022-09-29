import styled from 'styled-components';


export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
`;

export const RegisterSection = styled.div`
  color: #000;
  background: #fff;
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImageRegistrationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;

export const ImageRegistrationWrapperBig = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 991px) {
    display: none;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const ImageRegistrationWrapperMedium = styled.div`
  display: none;
  @media screen and (max-width: 991px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin:0 auto 0 auto;
  padding-top: 10px;
  @media screen and (max-width: 991px) {
    width: 50%;
    padding: 0 1em;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const FormWraper = styled.div`
  display:inline-block;
  margin-top: 50px;
`;

export const RegistrationLogoWrapper = styled.div`
  display:flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

export const RegistrationLogo = styled.h2`
  font-family: Arial;
  color: #000000;
  font-size: 30px;
`;

export const ImageWrapper = styled.img`
  width: 100%;
  height: 672px;
  object-fit: cover;
  object-position: bottom;
  @media screen and (max-width: 991px) {
    height: 720px;
  }
`
