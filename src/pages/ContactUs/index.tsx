import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillEnvelopeFill } from "react-icons/bs";
import { RootState } from '../../app/store'
import { t } from '../../i18n'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer';
import {
  CenteredTitle24,
  CenteredTitle32,
  CenteredContainer,
  CommonContainerGray,
  Container,
  TitleThree,
  JustifyText,
  LightHeader,
  LightHeaderText,
  FlexCenterContainer,
  FlexCenterHoriVertContainer,
  FlexCenterHoriVertContainerCol,
  MainFlexContainerComparison,
} from '../../globalStyles'

function ContactUs() {
  const { language } = useSelector((state: RootState) => state.language)

  return (
    <>
      <CommonContainerGray>
        <CenteredContainer>
          <MainFlexContainerComparison>
            <LightHeader>
                <LightHeaderText>{t('Contact us', language)}</LightHeaderText>
            </LightHeader>
            <FlexCenterHoriVertContainerCol style={{paddingTop: '4em'}}>
                <FlexCenterHoriVertContainer>
                    <BsFillEnvelopeFill size="4em" style={{cursor: "pointer", marginRight: "1em", color: '#E8505B',}}/>
                    <h1>General inquiries</h1>
                </FlexCenterHoriVertContainer>
                <div>Email us at support@noomer.io</div>
            </FlexCenterHoriVertContainerCol>

          </MainFlexContainerComparison>
        </CenteredContainer>
      </CommonContainerGray>

      <Footer />
    </>
  )

}

export default ContactUs;
