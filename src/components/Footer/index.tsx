import {
  FooterContainer,
  LinksContainer,
  CopyrightContainer,
  TextWrapper,
  LinksWrapper,
  LinkCategory,
  LogoSocialLinksContainer
 } from './styles';
 import {
   FooterLink,
   LeftColumnFlexNPChildren,
   RightColumnFlexNPChildren
 } from '../../globalStyles';

function Footer(){
    

    return <>
      <FooterContainer>
        <LinksContainer>

            <LogoSocialLinksContainer>
              <TextWrapper>
                  <h1>NOOMER</h1>
              </TextWrapper>
            </LogoSocialLinksContainer>
            <RightColumnFlexNPChildren>
              <LinksWrapper>
                <LeftColumnFlexNPChildren>
                  <LinkCategory>Product</LinkCategory>
                  <FooterLink onClick={() => console.log("Terms of Service")}>Terms of Service</FooterLink>
                  <FooterLink onClick={() => console.log("Privacy Policy")}>Privacy Policy</FooterLink>
                  <FooterLink onClick={() => console.log("FAQ")}>FAQ</FooterLink>
                </LeftColumnFlexNPChildren>
                <RightColumnFlexNPChildren>
                <LinkCategory>Resources</LinkCategory>
                  <FooterLink onClick={() => console.log("Documentation")}>Documentation</FooterLink>
                </RightColumnFlexNPChildren>
                <RightColumnFlexNPChildren>
                <LinkCategory>Company</LinkCategory>
                  <FooterLink onClick={() => console.log("About Us")}>About Us</FooterLink>
                  <FooterLink onClick={() => console.log("Contact Us")}>Contact Us</FooterLink>
                </RightColumnFlexNPChildren>
              </LinksWrapper>
            </RightColumnFlexNPChildren>

        </LinksContainer>
        <CopyrightContainer>
          <p>&copy; 2022 Noomer, All rights reserved</p>
        </CopyrightContainer>
      </FooterContainer>
    </>
}

export default Footer;
