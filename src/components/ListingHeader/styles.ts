import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderProps {
  backgroundImage: string
}

// export const HeaderContainer = styled.div<HeaderProps>`
//     display: flex;
//     align-items: center;
//     height: 200px;
//     background-image: ${(props) =>
//     `url(${props.backgroundImage})`};
//     color: #FFF;
//     font-weight: 600;
//     font-size: 48px;
//     padding: 2em;
//     @media screen and (max-width: 540px) {
//       display: none;
//     }
// `;

export const HeaderContainer = styled.img`
  width: 100%;
  height: 200px;
  @media screen and (max-width: 840px) {
    height: 140px;
  }
  @media screen and (max-width: 540px) {
    height: 100px;
  }
`;
