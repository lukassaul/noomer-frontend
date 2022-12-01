import React from 'react';
import {
 FacebookShareButton,
 LinkedinShareButton,
 TwitterShareButton,
 PinterestShareButton,
 FacebookIcon,
 TwitterIcon,
 PinterestIcon,
 LinkedinIcon
} from 'react-share';
import Footer from '../../components/Footer';
import { StepContainer, StepImageContainer } from './styles'
import { CommonContainer, CommonContentContainer } from '../../globalStyles'
import { SocialShareContainer } from './styles'

function PromoMechanics() {

  return (
    <>
      <CommonContainer>
        <CommonContentContainer>
        <div style={{display:"flex"}}>
          <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1669620093/promo-mechanics_jrjqvr.png" className="responsiveImg" style={{ objectFit: "cover" }}/>
        </div>
        <div className="padding2em">
          <SocialShareContainer className="social_share_container mb2em">
            <FacebookShareButton
              url={"https://noomer.io/promo"}
              quote={"Its time for a giveaway. noomer"}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={"https://noomer.io/promo"}
              title={"Its time for a giveaway."}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={"https://noomer.io/promo"} className="Demo__some-network__share-button">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <PinterestShareButton
              url={"https://noomer.io/promo"}
              media={`https://res.cloudinary.com/dba8ifej6/image/upload/v1669704105/promo-landing2_hwhnvo.png`}
              className="Demo__some-network__share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </SocialShareContainer>

          <p className="fontSize32 mb2em centerText">Get a chance to be part of the top 20 winners who take home part of the <span className="bf flat-red2-font">US $1000 in Cryptocurrency</span> every week.. <span className="bf">How does that sound?</span></p>
          <p className="mb2em justifyText">To enter. Simply sign up/register and start submitting those price records for various commodities that you know or that you are constantly buying.. You are required to post at least 20 posts and when it comes to the maximum,the sky's the limit. Simple and straight forward right? Share the link with your friends and family too!.. Christmas has come early this year. Let's start posting and grab that prize giveaway.</p>
          <StepContainer className="mb2em">
            <StepImageContainer>
              <p className="centerText flat-green-font">Step 1</p>
              <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1669878487/submit-step-1_pcmbpu.png" className="responsiveImg" />
              <p className="centerText">Click Submit Price Record</p>
            </StepImageContainer>
            <StepImageContainer>
              <p className="centerText flat-green-font">Step 2</p>
              <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1669878486/submit-step-2_pdfzqe.png" className="responsiveImg" />
              <p className="centerText">Select Product</p>
            </StepImageContainer>
            <StepImageContainer>
              <p className="centerText flat-green-font">Step 3</p>
              <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1669878486/submit-step-3_goergs.png" className="responsiveImg" />
              <p className="centerText">Fill up the form</p>
            </StepImageContainer>
          </StepContainer>
          <p className="bf mb2em justifyText">*NB- No duplication of posts is allowed. If any duplication of posts is detected, it will result in being penalised from the competition in any week.</p>
          <p className="justifyText"><span className="bf">Eligibility-</span> The Contest is open to all registered and verified users. Entrants must be 18 years of age or older as of their date of entry in this promotion in order to qualify.</p>
        </div>
        </CommonContentContainer>
      </CommonContainer>
      <Footer />
    </>
  )
}

export default PromoMechanics;
