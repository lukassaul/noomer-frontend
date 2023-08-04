import React, { useMemo, useState, useEffect } from 'react'
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import escapeRegExp from "lodash/escapeRegExp";
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import { getComparisonOptions } from '../../features/selectOptionsSlice'
import { postProductComparison } from '../../features/comparisonSlice'
import Button from "../Button";
import {
  FormError,
  FlexContainer,
  TitleTwo,
  MainFlexContainerComparison,
  MainFlexContainerRowComparison,
  MainFlexContainerColumnComparison,
} from '../../globalStyles'

const MAX_DISPLAYED_OPTIONS = 50;

type SelectOption = {
  label: string
  value: string
}

function ProductComparison() {

  const { language } = useSelector((state: RootState) => state.language)

  const { comparisonLocationSelectOption, comparisonProductSelectOption } = useSelector((state: RootState) => state.selectOptions)
  const { noomer } = useSelector((state: RootState) => state.comparison)

  const [locationOptions, setLocationOptions] = useState<SelectOption[]>([])
  const [productOptions, setProductOptions] = useState<SelectOption[]>([])
  const [productOptionsB, setProductOptionsB] = useState<SelectOption[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [productA, setProductA] = useState('')
  const [locationA, setLocationA] = useState('')
  const [productB, setProductB] = useState('')
  const [locationB, setLocationB] = useState('')
  const [inputValue, setInputValue] = useState<string>('')
  const [inputValueLocA, setInputValueLocA] = useState<string>('')
  const [inputValueProdB, setInputValueProdB] = useState<string>('')
  const [inputValueLocB, setInputValueLocB] = useState<string>('')

  const [productAError, setProductAError] = useState<boolean>(false)
  const [productBError, setProductBError] = useState<boolean>(false)
  const [locationAError, setLocationAError] = useState<boolean>(false)
  const [locationBError, setLocationBError] = useState<boolean>(false)

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
      backgroundColor: '#FFF',
      fontSize: '14px',
      margin: '10px 0',
      height: '32px'
    })
  }

  // const productOptions = [
  //   {label: "Rice", value: "Rice"},
  //   {label: "Beer", value: "Beer"},
  //   {label: "Tobacco", value: "Tobacco"}
  // ]
  //
  // const locationOptions = [
  //   {label: "Rice", value: "Rice"},
  //   {label: "Beer", value: "Beer"},
  //   {label: "Tobacco", value: "Tobacco"}
  // ]

  useEffect(() => {
    setLocationOptions(comparisonLocationSelectOption)
    setProductOptions(comparisonProductSelectOption)
    setProductOptionsB(comparisonProductSelectOption)
  }, [comparisonProductSelectOption])

  useEffect(() => {
    dispatch(getComparisonOptions('products'))
  }, [])

  useEffect(() => {

  }, [noomer])

  const filteredOptions = useMemo(() => {
    if (!inputValue) {
      return productOptions;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");

    let option: any;
    for (option of productOptions) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValue]);

  const slicedOptions = useMemo(
    () => filteredOptions.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptions]
  );

  const isSelectOption = (v: any): v is SelectOption => {
    if ((v as SelectOption).value !== undefined) return v.value
    return false
  }

/**
  Product options for PRODUCT B
**/
  const filteredOptionsB = useMemo(() => {
    if (!inputValueProdB) {
      return productOptionsB;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValueProdB), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValueProdB)}`, "i");

    let option: any;
    for (option of productOptionsB) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValueProdB]);

  const slicedOptionsB = useMemo(
    () => filteredOptionsB.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptionsB]
  );

  const isSelectOptionB = (v: any): v is SelectOption => {
    if ((v as SelectOption).value !== undefined) return v.value
    return false
  }


  const filteredOptionsLoc = useMemo(() => {
    if (!inputValueLocA) {
      return locationOptions;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValueLocA), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValueLocA)}`, "i");

    let option: any;
    for (option of locationOptions) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValueLocA]);

  const slicedOptionsLoc = useMemo(
    () => filteredOptionsLoc.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptionsLoc]
  );

  const isSelectOptionLoc = (v: any): v is SelectOption => {
    if ((v as SelectOption).value !== undefined) return v.value
    return false
  }

  const filteredOptionsLocB = useMemo(() => {
    if (!inputValueLocB) {
      return locationOptions;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValueLocB), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValueLocB)}`, "i");

    let option: any;
    for (option of locationOptions) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValueLocB]);

  const slicedOptionsLocB = useMemo(
    () => filteredOptionsLocB.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptionsLocB]
  );

  const isSelectOptionLocB = (v: any): v is SelectOption => {
    if ((v as SelectOption).value !== undefined) return v.value
    return false
  }


  useEffect(() => {
    if(productA && productAError) setProductAError(false)
  }, [productA])

  useEffect(() => {
    if(productB && productBError) setProductBError(false)
  }, [productB])

  useEffect(() => {
    if(locationA && locationAError) setLocationAError(false)
  }, [locationA])

  useEffect(() => {
    if(locationB && locationBError) setLocationBError(false)
  }, [locationB])

  const handleComparisonSubmit = async(e: any) => {
    e.preventDefault()

    if(!productA || !productB || !locationA || !locationB) {
      if(!productA) setProductAError(true); else setProductAError(false);
      if(!productB) setProductBError(true); else setProductBError(false);
      if(!locationA) setLocationAError(true); else setLocationAError(false);
      if(!locationB) setLocationBError(true); else setLocationBError(false);

      return
    }

    // Prepare data for postProductComparison api call
    let product_a = productA
    let locA = locationA.split(',')
    let product_b = productB
    let locB = locationB.split(',')

    let city_a = ''
    let state_a = ''
    let country_a = ''
    if (locA.length === 2) {
      city_a = locA[0].trim()
      country_a = locA[1].trim()
    }else{
      city_a = locA[0].trim()
      state_a = locA[1].trim()
      country_a = locA[2].trim()
    }

    let city_b = ''
    let state_b = ''
    let country_b = ''
    if (locB.length === 2) {
      city_b = locB[0].trim()
      country_b = locB[1].trim()
    }else{
      city_b = locB[0].trim()
      state_b = locB[1].trim()
      country_b = locB[2].trim()
    }

    let data = {
      product_a,
      city_a,
      state_a,
      country_a,
      product_b,
      city_b,
      state_b,
      country_b
    }


    let response = await dispatch(postProductComparison(data))

    if (response.meta.requestStatus === "fulfilled") {
      navigate('/noomer')
    }
  }

  return (

    <MainFlexContainerComparison id="Product_Comparison" className="parallax-section white-font padding2em">
      <form onSubmit={handleComparisonSubmit} aria-label="form">
        <div style={{textAlign: "center", marginBottom: "2em"}}>
          <TitleTwo>{t('Title_Product_Comparison', language)}</TitleTwo>
          <p>{t('Subtitle_Product_Comparison', language)}</p>
        </div>
        <MainFlexContainerRowComparison>
          <MainFlexContainerColumnComparison>
            <Select
              name="product"
              options={slicedOptions}
              onInputChange={(value) => setInputValue(value)}
              filterOption={() => true}
              styles={customStyles}
              placeholder='Select Product A'
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              onChange={(v) => {
                if (isSelectOption(v)) {
                  setProductA(v.value)
                }
              }}
            />
            <FormError>{productAError ? "Product A is required" : null}</FormError>

            <Select
              name="locationA"
              options={slicedOptionsLoc}
              onInputChange={(value) => setInputValueLocA(value)}
              filterOption={() => true}
              styles={customStyles}
              placeholder='Select Location A'
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              onChange={(v) => {
                if (isSelectOptionLoc(v)) {
                  setLocationA(v.value)
                }
              }}
            />
            <FormError>{locationAError ? "Location A is required" : null}</FormError>
          </MainFlexContainerColumnComparison>

          <MainFlexContainerColumnComparison>
            <Select
              name="productB"
              options={slicedOptionsB}
              onInputChange={(value) => {setInputValueProdB(value)}}
              filterOption={() => true}
              styles={customStyles}
              placeholder='Select Product B'
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              onChange={(v) => {
                if (isSelectOptionB(v)) {
                  setProductB(v.value)
                }
              }}
            />
            <FormError>{productBError ? "Product B is required" : null}</FormError>

            <Select
              name="locationB"
              options={slicedOptionsLocB}
              onInputChange={(value) => setInputValueLocB(value)}
              filterOption={() => true}
              styles={customStyles}
              placeholder='Select Location B'
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              onChange={(v) => {
                if (isSelectOptionLocB(v)) {
                  setLocationB(v.value)
                }
              }}
            />
            <FormError>{locationBError ? "Location B is required" : null}</FormError>
          </MainFlexContainerColumnComparison>


        </MainFlexContainerRowComparison>
        <FlexContainer style={{justifyContent: 'center'}}>
          <Button color="noomerGreen">{t('Button_Proceed', language)}</Button>
        </FlexContainer>
      </form>
    </MainFlexContainerComparison>
  )
}

export default ProductComparison;
