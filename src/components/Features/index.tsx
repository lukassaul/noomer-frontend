import React, { useState, useEffect } from 'react'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import {
  JustifyText,
} from '../../globalStyles'
import {
  MainFlexContainer,
  MainFlexContainerRow,
  MainFlexContainerColumn,
  MainFlexChildrenContainer,
  TitleThree,
} from './styles'

function Features() {

  const { language } = useSelector((state: RootState) => state.language)

  const faeturesArray = [
    {
      title: t('Feature_Title_Numeraire', language),
      description: t('Feature_Description_Numeraire', language),
      icon: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1691116671/icon_numeraire_hr0d1w.png'
    },{
      title: t('Feature_Title_Price_Listing', language),
      description: t('Feature_Description_Price_Listing', language),
      icon: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1691116671/icon_price_listing_e4gsnf.png'
    },{
      title: t('Feature_Title_Product_Comparison', language),
      description: t('Feature_Description_Product_Comparison', language),
      icon: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1691116671/icon_product_comparison_i1w0nd.png'
    }
  ]

  return (
    <MainFlexContainer>
      <MainFlexContainerRow className="features-container">
          {faeturesArray.map((feature) => (
            <MainFlexContainerColumn key={feature.title}>
              <MainFlexChildrenContainer style={{ "textAlign": "center"}}>
                <img src={feature.icon} alt={feature.title} />
                <TitleThree>{feature.title}</TitleThree>
                <JustifyText>{feature.description}</JustifyText>
              </MainFlexChildrenContainer>
            </MainFlexContainerColumn>
          ))}
      </MainFlexContainerRow>
    </MainFlexContainer>
  )
}

export default Features;
