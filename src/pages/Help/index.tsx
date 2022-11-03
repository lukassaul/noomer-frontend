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

function Help() {
  const { language } = useSelector((state: RootState) => state.language)

  return (
    <>
      <CommonContainerGray>
        <CenteredContainer>
          <MainFlexContainerComparison>
            <LightHeader>
                <LightHeaderText>{t('Help page', language)}</LightHeaderText>
            </LightHeader>
            <FlexCenterHoriVertContainerCol style={{padding: '4em'}}>
                <JustifyText>The help page seeks to provide instructional information on how the Noomer price comparison website works. The provided data on this page help the users familiarise themselves with the different functions and how to use the site. This page will help you navigate your way through the website easily.</JustifyText>
            </FlexCenterHoriVertContainerCol>

          </MainFlexContainerComparison>
        </CenteredContainer>
      </CommonContainerGray>

      <Footer />
    </>
  )

}

export default Help;
