import styled from 'styled-components';

export const VerificationSection = styled.div`
    color: #000;
    padding: 160px 0;
    background: #fff;
`;

export const VerifyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileImg = styled.div<{ background: string; }>`
  grid-area: image;
  background-image: url(${({ background }) => background});
  background-size: cover;
  width: 230px;
  height: 200px;
`;
