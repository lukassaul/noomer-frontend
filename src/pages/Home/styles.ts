import styled from 'styled-components';


export const WhatIsContainerTitle = styled.div`
    margin-bottom: -10px;
    display: flex;
    justify-content: center;
`;

export const WhatIsTitle = styled.p`
    font-size: 32px;
    font-weight: 600;
`;

export const WhatIsNoomerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em 0 0;
    background-color: white;
`

export const WhatIsNoomerUserImg = styled.div`
    display: block;
    @media screen and (max-width: 767px) {
        display: none;
    }
`

export const WhatIsNoomerContent = styled.div`
    width: 60%;
    @media screen and (max-width: 767px) {
        width: 100%;
        padding: 0.5em;
    }
`
