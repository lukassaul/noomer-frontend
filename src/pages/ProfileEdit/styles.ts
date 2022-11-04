import styled from 'styled-components';

export const ProfileImg = styled.div<{ background: string; }>`
  grid-area: image;
  background-image: url(${({ background }) => background});
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  // margin-left: auto;
  // margin-right: auto;
`;

export const ProfileContainer = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  /* max-width: 1020px; */
  width: 100%;
  margin-top: 58px;
  padding-left: 50px;
  padding-right: 50px;
  @media screen and (max-width: 540px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 0;
  }
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ProfileImageTextCointainer = styled.div`
  display: inline-block;
`;

export const ProfileEditFormContainer = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 632px;
  margin-right: auto;
  margin-left: auto;
`;

export const SettingHeader = styled.h2`
  font-weight: 700px;
  font-size: 20px;
  font-family: Arial;
  line-height: 23px;
  margin-top: 80px;
  margin-bottom: 90px;
`;

export const SettingContainer = styled.div`
  padding-left: 20px;
`;

export const ChangePassword = styled.p`
  font-family: Arial;
  font-weight: 400;
  line-height: 16.1px;
  margin-bottom: 27px;
`;

export const Deactivate = styled.p`
  font-family: Arial;
  font-weight: 400;
  line-height: 16.1px;
  margin-bottom: 27px;
`;

export const ProfileArrowContainer = styled.div`
  /* bottom: 26px;
  left:25px; */
  display: flex;
  height: 60%;
`;

export const ProfileArrow = styled.div`
  display: flex;
  justify-content: space-between;
  /* max-width: 150px; */
  padding: 20px;
`;

export const ContainerArrow = styled.div`
  display: flex;
  align-self: flex-end;
`;

export const ProfileArrowText = styled.p`
  font-family: Arial;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-left: 20px;
`;

export const ArrowSmall = styled.img`
  display: none;
  @media screen and (max-width: 540px) {
    display: flex;
    margin: 20px;
    cursor: pointer;
  }
`;

export const ProfileSideContainer = styled.div<{click: boolean}>`
  display: none;
  @media screen and (max-width: 540px) {
    display: inline-block;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 36px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: #fff;
  }
`;

export const MobileIconProfile = styled.div`
    display: none;

    @media screen and (max-width: 540px) {
        display: flex;
        position: absolute;
        top: 20px;
        right: 0;
        transform: translate(-100%, 60%); */
        font-size: 1rem;
    }
`;

export const ProfileMobileContainer = styled.div`
  display: block;
  margin: 35px;
`;
