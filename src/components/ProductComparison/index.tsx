import React, { useState, useEffect } from 'react'
import Select from "react-select";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import Button from "../Button";
import {
  FlexContainer,
  JustifyText,
  TitleTwo,
  TitleThree,
  MainFlexContainer,
  MainFlexContainerRow,
  MainFlexContainerColumn,
  MainFlexChildrenContainer,
} from '../../globalStyles'

function ProductComparison() {

  const { language } = useSelector((state: RootState) => state.language)

  const customStyles = {
    option: () => ({
      fontSize: '14px',
      padding: 10,
      cursor: 'pointer'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '100%',
      border: '1px solid #c4c4c4',
      borderRadius: '5px',
      fontSize: '14px',
      margin: '10px 0',
      height: '32px'
    })
  }

  const productOptions = [
    {label: "Rice", value: "Rice"},
    {label: "Beer", value: "Beer"},
    {label: "Tobacco", value: "Tobacco"}
  ]

  const locationOptions = [
    {label: "Rice", value: "Rice"},
    {label: "Beer", value: "Beer"},
    {label: "Tobacco", value: "Tobacco"}
  ]

  return (
    <MainFlexContainer className="bg-beige padding2em">
      <div style={{textAlign: "center"}}>
        <TitleTwo>{t('Title_Product_Comparison', language)}</TitleTwo>
        <p>{t('Subtitle_Product_Comparison', language)}</p>
      </div>
      <MainFlexContainerRow>
        <MainFlexContainerColumn>
          <Select
            options={productOptions}
            styles={customStyles}
            placeholder='Select Product 1'
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          />

          <Select
            options={locationOptions}
            styles={customStyles}
            placeholder='Select Location 1'
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          />
        </MainFlexContainerColumn>

        <MainFlexContainerColumn>
          <Select
            options={productOptions}
            styles={customStyles}
            placeholder='Select Product 2'
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          />

          <Select
            options={locationOptions}
            styles={customStyles}
            placeholder='Select Location 2'
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          />
        </MainFlexContainerColumn>


      </MainFlexContainerRow>
      <FlexContainer style={{justifyContent: 'center'}}>
        <Button color="primary">{t('Button_Proceed', language)}</Button>
      </FlexContainer>
    </MainFlexContainer>
  )
}

export default ProductComparison;
