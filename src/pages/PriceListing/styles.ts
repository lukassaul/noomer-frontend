import styled from 'styled-components';

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1280px;
    padding-top: 20px;
    margin: auto;
`;

export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    //width: 100%;
    max-width: 500px;
    @media screen and (max-width: 540px) {
        display:none;
    }
`;

export const DataWrapper = styled.div`
    display: flex;
    margin: auto;
    min-width: 1000px;
    @media screen and (max-width: 1154px) {
        min-width: 800px;
    }
    @media screen and (max-width: 920px) {
        min-width: 400px;
    }
    @media screen and (max-width: 480px) {
        min-width: 430px;
    }
    @media screen and (max-width: 428px) {
        min-width: 375px;
    }
    @media screen and (max-width: 371px) {
        min-width: 350px;
    }
`;

export const ListTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ".5em";
    margin-bottom: 10px;
`;

export const ListTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    font-family: helvetica;
    line-height: 20.7px;
    color: #000000;
    cursor: 'pointer';
`;

export const CreateDateWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

export const CreateDateTitle = styled.p`
    font-style: italic;
    color: #747474;
    font-size: 14px;
    line-height: 16.1px;
    font-weight: 400;
    font-family: helvetica;
    padding-right: 5px;
`;

export const CreateDate = styled.p`
    font-size: 16px;
    line-height: 20.7px;
    font-weight: 400;
    font-family: helvetica;
    color: #000000;
`;

export const ExpirationWrapper = styled.div`
    display: flex;
`;

export const ExpirationTitle = styled.p`
    font-style: italic;
    color: #747474;
    font-size: 14px;
    line-height: 16.1px;
    font-weight: 400;
    font-family: helvetica;
    padding-right: 5px;
`;

export const Expiration = styled.p`
    font-size: 16px;
    line-height: 20.7px;
    font-weight: 400;
    font-family: helvetica;
    color: #000000;
`;

export const ItemContentWrapper = styled.div`
    margin-bottom: 20px;
    @media screen and (max-width: 760px) {
        max-width: 500px;
    }
    @media screen and (max-width: 716px) {
        max-width: 450px;
    }
    @media screen and (max-width: 669px) {
        max-width: 420px;
    }
    @media screen and (max-width: 661px) {
        max-width: 400px;
    }
    @media screen and (max-width: 620px) {
        max-width: 390px;
    }
    @media screen and (max-width: 610px) {
        max-width: 370px
    }
    @media screen and (max-width: 591px) {
        max-width: 350px
    }
    @media screen and (max-width: 480px) {
        max-width: 450px
    }
`;

export const ItemContent = styled.p`
    font-family: helvetica;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: #000000;
`;

export const FilterWrapperMobile = styled.div<{click: boolean}>`
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
        padding: 30px;
        z-index: 1;
    }
`;

export const FilterButtonWrapper = styled.div`
  display: none;
  @media screen and (max-width: 540px) {
    display: flex;
    margin: 0 8px;
    cursor: pointer;
  }
`

export const ArrowSmall = styled.img`
  margin: 0 8px;
  cursor: pointer;
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

export const DesktopResultWrapper = styled.div`
    display: contents;
    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const MobileResultWrapper = styled.div`
    display: none;

    @media screen and (max-width: 540px) {
        display: block;
    }
`;
