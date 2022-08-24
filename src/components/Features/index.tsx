import React, { useState, useEffect } from 'react'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import {
  JustifyText,
  TitleThree,
  MainFlexContainer,
  MainFlexContainerRow,
  MainFlexContainerColumn,
  MainFlexChildrenContainer,
} from '../../globalStyles'

function Features() {

  const { language } = useSelector((state: RootState) => state.language)

  const faeturesArray = [
    {
      title: t('Feature_Title_Numeraire', language),
      description: t('Feature_Description_Numeraire', language),
    },{
      title: t('Feature_Title_Price_Listing', language),
      description: t('Feature_Description_Price_Listing', language),
    },{
      title: t('Feature_Title_Product_Comparison', language),
      description: t('Feature_Description_Product_Comparison', language),
    }
  ]

  return (
    <MainFlexContainer>
      <MainFlexContainerRow>
          {faeturesArray.map((feature) => (
            <MainFlexContainerColumn>
              <MainFlexChildrenContainer style={{ "textAlign": "center"}}>
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
