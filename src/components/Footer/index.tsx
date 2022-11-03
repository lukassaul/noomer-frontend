import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

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
                  <FooterLink onClick={() => navigate('/terms')}>Terms of Service</FooterLink>
                  <FooterLink onClick={() => navigate('/policy')}>Privacy Policy</FooterLink>
                  <FooterLink onClick={() => navigate('/faqs')}>FAQ</FooterLink>
                </LeftColumnFlexNPChildren>
                <RightColumnFlexNPChildren>
                <LinkCategory>Resources</LinkCategory>
                  <FooterLink onClick={() => console.log("Documentation")}>Documentation</FooterLink>
                </RightColumnFlexNPChildren>
                <RightColumnFlexNPChildren>
                <LinkCategory>Company</LinkCategory>
                  <FooterLink onClick={() => navigate('/about')}>About Us</FooterLink>
                  <FooterLink onClick={() => navigate('/contact')}>Contact Us</FooterLink>
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
