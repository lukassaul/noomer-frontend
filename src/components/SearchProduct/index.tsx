import React, { useState, useEffect } from 'react'
import { BsSearch } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import { SuspenseImg } from "../../SuspenseImage";
import {
  JustifyText,
  TitleTwo,
  MainFlexContainer,
  MainFlexContainerRow,
  MainFlexContainerColumn,
  MainFlexChildrenContainer,
} from '../../globalStyles'

function SearchProduct() {

  const { language } = useSelector((state: RootState) => state.language)

  return (
    <MainFlexContainer>
      <TitleTwo>{t('Title_Search_Product', language)}</TitleTwo>
      <MainFlexContainerRow>
        <div style={{width: "100%"}}>
          <div className="search_wrapper">
            <div className="search_icon"><BsSearch /></div>
            <input
              className="search_input"
              placeholder="Search for commodity"
              type="text"
            />
          </div>
        </div>
      </MainFlexContainerRow>
    </MainFlexContainer>
  )
}

export default SearchProduct;
