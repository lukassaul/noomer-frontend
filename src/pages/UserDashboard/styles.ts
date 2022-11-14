import styled from 'styled-components';

export const ProfileImg = styled.div<{ background: string; }>`
  grid-area: image;
  background-color: #fff;
  background-image: url(${({ background }) => background});
  background-size: cover;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  @media screen and (max-width: 1024px) {
    width: 150px;
    height: 150px;
  }
`;

export const DashContainer = styled.div`
  max-width: 1280px;
  min-height: calc(100vh - 320px);
  margin-right: auto;
  margin-left: auto;
`;

export const DashHeader = styled.div`
  z-index: 1;
  width: 100%;
  height: 250px;
  padding-right: 50px;
  padding-left: 50px;
  margin-right: auto;
  margin-left: auto;
  background-image: url('https://res.cloudinary.com/dba8ifej6/image/upload/v1664782714/dashboard-header_fsis6f.jpg');
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const ProfileButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
      &:first-child {
        margin-bottom: 12px;
        margin-right: 0;
      }
    }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    > * {
        &:first-child {
          margin-bottom: 0;
          margin-right: 12px;
        }
      }
  }
`;
