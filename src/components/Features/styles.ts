import styled from 'styled-components';

export const MainFlexContainer = styled.div`
  width: 100%;
  // background-color: #263238;
  min-height: 332px;
  background: url('https://res.cloudinary.com/dba8ifej6/image/upload/v1691046899/map_2_wbl56a.png'), rgba(112, 144, 139, 0.2);
  background-size: cover;
  background-repeat: no-repeat;
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 720px) {
    background-color: transparent;
    min-height: auto;
  }
`;

export const MainFlexContainerRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 4px;
`;

export const MainFlexContainerColumn = styled.div`
  flex: 30%;
  max-width: 30%;
  padding: 0 4px;
  margin-bottom: 0;
  background-color: transparent;
  @media screen and (max-width: 720px) {
    background-color: rgba(112, 144, 139, 0.2);
    flex: 100%;
    max-width: 100%;
    margin-bottom: 12px;
  }
`;

export const MainFlexChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  @media screen and (max-width: 600px) {
    padding: 1em;
  }
`;

export const TitleThree = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding: 1rem 0;
  @media screen and (max-width: 600px) {
    padding: 0.5em 0 1em;
  }
`;
