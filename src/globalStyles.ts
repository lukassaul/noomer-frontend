import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: helvetica;
 }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
  @media screen and (max-width: 480px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const TickerContainer = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  padding: 8px;
  background-color: #4C5055;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
  @media screen and (max-width: 480px) {
    padding-right: 0;
    padding-left: 0;
  }
`;


export const HeaderContainer = styled.div`
  z-index: 1;
  width: 100%;
  // height: 567px;
  // padding-right: 50px;
  // padding-left: 50px;
  // margin-right: auto;
  // margin-left: auto;
  display: flex;
  align-items: end;
  justify-content: flex-end;
  padding-bottom: 4em;
`;

export const BodyContainer = styled.div`
  z-index: 1;
  width: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TwoColumnContainer = styled.div`
  content: "";
  display: flex;
  clear: both;
  width: 100%;
  justify-content: space-between;
`;

export const TwoColumnChildren = styled.div`
  float: left;
  width: 40%;
  /* height: 100% */
`;

export const TwoColumnFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 480px) {
    padding: 0 1em;
  }
`;

export const LeftColumnFlexNPChildren = styled.div`
  flex: 1; /* additionally, equal width */
`;

export const LeftColumnFlex50NPChildren = styled.div`
  width: 50%; /* additionally, equal width */
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const LeftColumnFlex40NPChildren = styled.div`
  width: 40%; /* additionally, equal width */
  @media screen and (max-width: 480px) {
    width: 50%;
    padding-left: 1em;
  }
`;

export const LeftColumnFlex70NPChildren = styled.div`
  width: 70%; /* additionally, equal width */

  @media screen and (max-width: 991px) {
    width: 60%;
  }
  @media screen and (max-width: 480px) {
    width: 50%;
  }
`;

export const RightColumnFlexNPChildren = styled.div`
  flex: 1; /* additionally, equal width */
  color: #FFFFFF;
`;

export const LeftColumnFlexChildren = styled.div`
  display: inline-block;
  width: 25%; /* additionally, equal width */
  padding: 3em;
  max-width: 299px;
  border-right: 1px solid #E5E5E5;
  /* height: calc(100vh - 320px); */
  @media screen and (max-width: 1024px) {
    height: calc(100vh - 320px);
  }
  @media screen and (max-width: 820px) {
    padding-left: 1em;
    padding-right: 1em;
  }
  @media screen and (max-width: 768px) {
    height: calc(100vh - 220px)
  }
  @media screen and (max-width: 540px) {
    display: none;
  }
`;

export const LeftColumnFlexChildrenNegativeMargin = styled.div`
  width: 20%; /* additionally, equal width */
  padding: 1em;
  margin-top: -120px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const RightColumnFlexDashNPChildren = styled.div`
  flex: 1; /* additionally, equal width */
  padding-top: 1em;
  border-left: 1px solid #E5E5E5;
  @media screen and (max-width: 480px) {
    width: 100%;
    border-left: 0px solid #fff;
    border-top: 1px solid #E5E5E5;
  }
`;

export const RightColumnFlexChildren = styled.div`
  flex: 1; /*additionally, equal width */
  display: inline-block;
  padding: auto;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

export const JustifiedTextContainer = styled.div`
  text-align: justify;
`;

export const CenteredTextContainer = styled.div`
  text-align: center;
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredContainerDash = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  border-bottom: 1px solid #e9e7e7;
  padding: 12px;
  width: 80%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const CenteredContainerHiddenSmall = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 991px) {
    display: none;
  }
`;

export const CenteredContainerShowSmall = styled.div`
  display: none;

  @media screen and (max-width: 991px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const TextWrapperMargin12 = styled.div`
  margin: 2em 0;
`;

export const NoDataLogo = styled.img`
    width: 200px;
    height: 200px;
    /**margin: 15px;**/
`;

export const ImagePreview = styled.img`
    width: 500px;
    height: auto;
    @media screen and (max-width: 480px) {
      width: 420px;
      height: auto;
    }
`;

export const BlogThumbnail = styled.img`
    width: 240px;
    height: 160px;
    margin: 12px;
`;

export const EmailIcon = styled.img`
    width: 14px;
    height: 14px;
    margin: 0 12px;
`;

export const GreenCheckIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const FooterIcon = styled.img`
    width: 22px;
    height: 22px;
    margin: 12px 12px 0 0;
`;

export const DailaiLogo = styled.img`
    margin: 0;
`;

export const DailaiHomeLogo = styled.img`
    margin: 1em 0 0 0;
    width: 280px;
    @media screen and (max-width: 480px) {
      width: 150px;
    }
`;

export const IconComp = styled.img`
    margin: 0 0 0 8px;
    width: 18px;
`;

export const OneZeroNineThumbnail = styled.img`
    width: 109px;
    height: 109px;
    margin: 12px;
`;

export const SeventyThreeThumbnail = styled.img`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: contain;
`;

export const CommonContainer = styled.div`
  max-width: 1280px;
  min-height: calc(100vh - 320px);
  margin-right: auto;
  margin-left: auto;
  @media screen and (max-width: 1276px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media screen and (max-width: 480px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const CommonContentContainer = styled.div`
  max-width: 1280px;
  min-height: calc(100vh - 352px);
  margin-right: auto;
  margin-left: auto;
  /* @media screen and (max-width: 480px) {
    padding: 0 1em;
  } */
`;

export const BlackHeader = styled.div`
  z-index: 1;
  width: 100%;
  height: 168px;
  padding-right: 50px;
  padding-left: 50px;
  margin-right: auto;
  margin-left: auto;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
    text-align: center;
  }
`;

export const BlackHeaderText = styled.p`
    color: #ffffff;
    font-family: Arial;
    font-weight: 900;
    font-size: 28px;
`;

export const ArrowIcon33 = styled.img`
    max-width:33px;
`;

export const HorizontalLine = styled.hr`
    border-top: 1px solid #E8E7E7;
    margin: 2em 0;
`;

export const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-contents: center;
  margin: 3em 0;

  @media screen and (max-width: 991px) {
    width: 100%;
  }

`;

export const FlexRowSpaceBetweenDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 991px) {
    flex-direction: column;
  }
`;

export const FooterWrapper = styled.div`
    display: block;

    @media screen and (max-width: 480px) {
      display: none;
    }
`;

export const VerticalTabContainer = styled.div`
    display: block;

    @media screen and (max-width: 480px) {
      display: none;
    }
`;

export const HorizontalTabContainer = styled.div`
    display: none;

    @media screen and (max-width: 480px) {
      display: block;
    }
`;

export const PaginatorContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2em 0;

    @media screen and (max-width: 480px) {

    }
`;

export const PaginatorRatingContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2em 0;
    width: 80%;
    @media screen and (max-width: 480px) {
      width: 100%;
    }
`;

export const SecurityContainer = styled.div`
    padding: 0;

    @media screen and (max-width: 1280px) {
      padding: 0 1em;
    }
`;

export const StartWritingButton = styled.p`
  background-color: #fff;
  padding: 18px 24px;
  border: 1px solid #5e5e5e;
  border-radius: 12px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
    border-radius: 12px;
    margin-left: 118px;
  }
  @media screen and (max-width: 480px) {
    padding: 8px 12px;
    border-radius: 12px;
    margin-left: 0px;
  }
`;

export const EditButton = styled.p`
  color: #fff;
  font-size: 12px;
  background-color: #302D2D;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
`;

export const DeleteButton = styled.p`
  color: #607d8b;
  font-size: 12px;
  cursor: pointer;
`;

export const FooterLink = styled.p`
  cursor: pointer;
  &:hover {
    color: #302D2D;
  }
`;

export const FormError = styled.p`
  color: #f44336;
  font-size: 14px;
`;

export default GlobalStyle;
