import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderProps {
  backgroundImage: string
}

export const HeaderContainer = styled.div<HeaderProps>`
    display: flex;
    align-items: center;
    height: 265px;
    background-image: ${(props) =>
    `url(${props.backgroundImage})`};
    color: #FFF;
    font-weight: 600;
    font-size: 48px;
    padding: 2em;
`;
