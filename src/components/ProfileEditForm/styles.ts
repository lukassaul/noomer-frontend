import styled from 'styled-components';


export const ProfileTextArea = styled.textarea`
    display: flex;
    padding: 5px 5px 5px 5px;
    width: 100%;
    margin: 10px 0;
    height: 150px;
`;

export const ProfileInput = styled.input`
    display: flex;
    padding: 5px 5px 5px 10px;
    margin-bottom: 20px;
    width: 100%;
`;

export const ButtonContainerProfile = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 50px;
`;

export const ProfileImageInput = styled.input`
    opacity: 0;
   position: absolute;
   z-index: -1;
`;

export const ChangeImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 75px;
`;

export const PLink = styled.p`
    padding: 5px 15px;
    cursor: pointer;

`;

export const IfUs = styled.p`
    font-family: Arial;
    font-size: 10px;
    font-weight: 400;
    line-height: 11.5px;
    color: #747474;
    font-style: italic;
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

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

export const AvatarContainerPC = styled.div`
  display: block;
  margin-top: 1em;
  @media screen and (max-width: 480px) {
    display: none;
    margin-top: 0;
  }
`;

export const AvatarContainerMobile = styled.div`
  display: none;
  margin-top: 0;
  @media screen and (max-width: 480px) {
    margin-top: 1em;
    display: block;
  }
`;
