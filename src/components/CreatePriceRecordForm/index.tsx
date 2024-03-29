import React, { useMemo, useState, useEffect } from 'react'
import usePriceRecordForm from '../../hooks/usePriceRecordForm';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from "react-select";
import escapeRegExp from "lodash/escapeRegExp";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { RootState, AppDispatch } from '../../app/store'
import { t } from '../../i18n'
import { getAllCities, getAllCurrencies, getAllProducts } from '../../features/selectOptionsSlice'
import {
  LoginButtonWrapper,
  ProductSelectWrapper,
  TwoColumnContainer,
} from './styles'
import {
  IconComp,
  ImagePreview,
  CenteredContainer,
  FormInput,
  FormTextArea,
  FormError,
  FlexCenterColContainer,
  FormLabelContainer,
  FormLabel,
  FormRequired,
  FormInputContainer,
  FormInput50Width,
  DarkHeader,
  DarkHeaderText,
  RightLinkContainer,
  LeftLinkContainer,
  LinkParagraph,
  TwoColumn70Container
} from '../../globalStyles'
import Button from '../Button'

import imageProcessor from '../../utils/imageProcessor'
import urlToFile from '../../utils/urlToFile'

const MAX_DISPLAYED_OPTIONS = 50;

type SelectOption = {
  label: string
  value: string
}

type SelectOptionCur = {
  label: string
  value: string
}

type SelectOptionProd = {
  label: string
  value: string
}

const servicesUnitOption = [
  {label: 'Hourly', value: 'Hourly'},
  {label: 'Daily', value: 'Daily'},
  {label: 'Per project', value: 'Per project'},
]

function CreatePriceRecordForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { language } = useSelector((state: RootState) => state.language)
  const { isSubmitPriceRecordFetching } = useSelector((state: RootState) => state.priceRecord)
  const {
    productSelectOption,
    locationSelectOption,
    currencySelectOption,
    isGetLocationsFetching,
    isGetCurrenciesFetching,
    isGetProductsFetching
  } = useSelector((state: RootState) => state.selectOptions)


  const { register, setValue, onSubmit, errors } = usePriceRecordForm();

  const [step, setStep] = useState<number>(1);

  const [productCategory, setProductCategory] = useState<string>('');

  const [inputValue, setInputValue] = useState<string>('')
  const [inputValueCur, setInputValueCur] = useState<string>('')
  const [inputValueProd, setInputValueProd] = useState<string>('')

  const [selectOptionProductName, setSelectOptionProductName] = useState<string>('')
  const [selectOptionProductCategory, setSelectOptionProductCategory] = useState<string>('')
  const [productNameLabel, setProductNameLabel] = useState<string>('Product Name')
  const [productNamePlaceholder, setProductNamePlaceholder] = useState<string>('Enter Product Name')
  const [shopNameLabel, setShopNameLabel] = useState<string>('Shop Name')
  const [shopNamePlaceholder, setShopNamePlaceholder] = useState<string>('Enter shop name')
  const [showQuantity, setShowQuantity] = useState<boolean>(true)
  const [showUnit, setShowUnit] = useState<boolean>(true)
  const [showRetailServiceCheckbox, setShowRetailServiceCheckbox] = useState<boolean>(true)


  const [productType, setProductType] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [location_city, setLocationCity] = useState<string>('');
  const [location_state, setLocationState] = useState<string>('');
  const [location_country, setLocationCountry] = useState<string>('');
  const [location_latitude, setLocationLatitude] = useState<string>('');
  const [location_longitude, setLocationLongitude] = useState<string>('');
  const [cityTicker, setCityTicker] = useState<string>('');
  const [ed_location_city, setEditFromCity] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [retailCheckbox, setRetailCheckbox] = useState<boolean>(false);
  const [serviceCheckbox, setServiceCheckbox] = useState<boolean>(false);
  const [priceRecordImage, setPriceRecordImage] = useState<File | any>(null);


  const profileId = localStorage.getItem('user')
  const [reason, setReason] = useState<string>('');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescription(value)
  }


  const filteredOptions = useMemo(() => {
    if (!inputValue) {
      return locationSelectOption;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");

    for (const option of locationSelectOption) {
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

  const filteredOptionsCur = useMemo(() => {
    if (!inputValueCur) {
      return currencySelectOption;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValueCur), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValueCur)}`, "i");

    for (const option of currencySelectOption) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValueCur]);

  const slicedOptionsCur = useMemo(
    () => filteredOptionsCur.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptionsCur]
  );

  const filteredOptionsProd = useMemo(() => {
    if (!inputValueProd) {
      return productSelectOption;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValueProd), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValueProd)}`, "i");

    for (const option of productSelectOption) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValueProd]);

  const slicedOptionsProd = useMemo(
    () => filteredOptionsProd.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptionsProd]
  );

  const customStyles = {
    option: () => ({
      fontSize: '14px',
      padding: 10,
      cursor: 'pointer'
    }),
    control: () => ({
      backgroundColor: '#FFF',
      width: '80%',
      border: '1px solid #c4c4c4',
      borderRadius: '5px',
      fontSize: '14px',
      margin: '10px 0',
      height: '32px'
    })
  }

  const categoryCustomStyles = {
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

  const isSelectOption = (v: any): v is SelectOption => {
    if ((v as SelectOption).value !== undefined) return v.value
    return false
  }

  const isSelectOptionCur = (v: any): v is SelectOptionCur => {
    if ((v as SelectOptionCur).value !== undefined) return v.value
    return false
  }

  const isSelectOptionProd = (v: any): v is SelectOptionProd => {
    if ((v as SelectOptionProd).value !== undefined) return v.value
    return false
  }

  useEffect(() => {
    if (profileId) setValue('uploader', profileId)
  }, [profileId]);

  useEffect(() => {
    if(locationSelectOption.length === 0 && !isGetLocationsFetching)dispatch(getAllCities('cities'))
    if(productSelectOption.length === 0 && !isGetProductsFetching)dispatch(getAllProducts('products'))
    if(currencySelectOption.length === 0 && !isGetCurrenciesFetching)dispatch(getAllCurrencies('currencies'))
  }, []);


  const saveImage = async (e: any) => {
    e.preventDefault()
    const imagePriceRecord = await imageProcessor(e.target.files[0])
    setPriceRecordImage(imagePriceRecord)

    urlToFile(imagePriceRecord, 'product.png')
     .then((file)=>{
       setValue('product_image', file)
     });
  }


  function validateTypeCheckBox(box: string) {

    if (box === "RETAIL") {
      if (!retailCheckbox) {
        setRetailCheckbox(true)
        setValue("type", box)
        setProductType(box)
        if (serviceCheckbox) setServiceCheckbox(false)
      } else {
        setRetailCheckbox(false)
        setValue("type", "")
        setProductType("")
      }
    }

    if (box === "SERVICE") {
      if (!serviceCheckbox) {
        setServiceCheckbox(true)
        setValue("type", box)
        setProductType(box)
        if (retailCheckbox) setRetailCheckbox(false)
      } else {
        setServiceCheckbox(false)
        setValue("type", "")
        setProductType("")
      }
    }
  }



  const gotoStepOne = (e: any) => {
    e.preventDefault();
    setStep(1)
  }

  const gotoStepTwo = (e: any) => {
    e.preventDefault();
    setStep(2)
  }

  return (
      <form onSubmit={onSubmit} aria-label="form">
        {step === 1 ?
          <>
            <DarkHeader>
              <DarkHeaderText>Select Product or Services</DarkHeaderText>
            </DarkHeader>
            <LeftLinkContainer style={{padding: '2em'}}>
              <BsFillArrowLeftCircleFill size="1.5em" style={{marginRight: "1em", color: '#E8505B', cursor: 'pointer'}} onClick={() => navigate(-1)}/>
              <LinkParagraph onClick={() => navigate(-1)}>Back</LinkParagraph>
            </LeftLinkContainer>
            <FlexCenterColContainer style={{padding: '2em', alignItems: 'center'}}>
              <ProductSelectWrapper>

                <Select
                  {...register("product")}
                  name="product"
                  options={slicedOptionsProd}
                  onInputChange={(value) => setInputValueProd(value)}
                  filterOption={() => true}
                  placeholder='Product / Services'
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  onChange={(v) => {
                    if (isSelectOptionProd(v)) {
                      let product = v.value
                      let selectedOption = product.split(',')
                      setValue('product', selectedOption[0])
                      setProductCategory(selectedOption[0])
                      setSelectOptionProductName(selectedOption[1])
                      setSelectOptionProductCategory(selectedOption[2])

                      if(selectedOption[2] === "Services") {
                        setProductNameLabel("Type of Service")
                        setProductNamePlaceholder("Enter type of service")
                        setShopNameLabel("Company Name")
                        setShopNamePlaceholder("Enter company name")
                        setServiceCheckbox(true)
                        setRetailCheckbox(false)
                        setShowQuantity(false)
                        setShowUnit(true)
                        setShowRetailServiceCheckbox(false)
                        validateTypeCheckBox("SERVICE")
                      } else if(selectedOption[2] === "Currency") {
                        setProductNameLabel("Currency Pair")
                        setProductNamePlaceholder("Enter currency pair")
                        setShopNameLabel("Shop Name")
                        setShopNamePlaceholder("Enter shop name")
                        setServiceCheckbox(false)
                        setRetailCheckbox(true)
                        setShowQuantity(false)
                        setShowUnit(false)
                        validateTypeCheckBox("RETAIL")
                      } else if(selectedOption[2] === "Real Estate") {
                        setProductNameLabel("Unit Size")
                        setProductNamePlaceholder("Enter unit size")
                        setShopNameLabel("Company Name")
                        setShopNamePlaceholder("Enter company name")
                        setServiceCheckbox(false)
                        setRetailCheckbox(true)
                        setShowQuantity(false)
                        setShowUnit(false)
                        validateTypeCheckBox("RETAIL")
                      }else {
                        setProductNameLabel("Product Name")
                        setProductNamePlaceholder("Enter product name")
                        setShopNameLabel("Company Name")
                        setShopNameLabel("Shop Name")
                        setShopNamePlaceholder("Enter shop name")
                        setServiceCheckbox(false)
                        setRetailCheckbox(false)
                        setShowQuantity(true)
                        setShowUnit(true)
                      }
                    }
                  }}
                />
              </ProductSelectWrapper>
            </FlexCenterColContainer>

            <RightLinkContainer style={{padding: '2em'}}>
              <Button
                color="secondaryRed"
                disabled={!productCategory}
                onClick={(e) => {
                  gotoStepTwo(e)
                }}>Next</Button>
            </RightLinkContainer>
          </>
          :
          null
        }

        {step === 2 ?
          <>
              <DarkHeader>
                <DarkHeaderText>Price Record for {selectOptionProductCategory} : {selectOptionProductName}</DarkHeaderText>
              </DarkHeader>
              <LeftLinkContainer onClick={(e) => gotoStepOne(e)}>
                <BsFillArrowLeftCircleFill size="1.5em" style={{marginRight: "1em", color: '#E8505B', cursor: 'pointer'}} />
                <LinkParagraph onClick={(e) => gotoStepOne(e)}>Back</LinkParagraph>
              </LeftLinkContainer>

              <TwoColumnContainer>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <FormLabelContainer>
                    <FormLabel>{t('Upload product image', language)}</FormLabel>
                  </FormLabelContainer>
                  {priceRecordImage ? <CenteredContainer><ImagePreview src={priceRecordImage} /></CenteredContainer> : null}

                  <input
                    type="file"
                    name='product_image'
                    accept="image/*"
                    style={{ marginBottom: '1em', marginTop: '10px' }}
                    onChange={saveImage}
                    />
                </div>

                <TwoColumn70Container>
                  <FormInput50Width>
                    {!ed_location_city ? <>
                      <FormLabelContainer>
                        <FormRequired>*</FormRequired>
                        <FormLabel>{t('Location', language)}</FormLabel>
                      </FormLabelContainer>
                      <Select
                        {...register("location_city")}
                        name="location"
                        options={slicedOptions}
                        onInputChange={(value) => setInputValue(value)}
                        filterOption={() => true}
                        // styles={customStyles}
                        className="width80"
                        placeholder='* Location'
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        onChange={(v) => {
                          if (isSelectOption(v)) {
                            const loc = v.value.split(',')

                            if(loc.length === 6) {

                              setValue('location_city', loc[0])
                              setValue('location_state', loc[1])
                              setValue('location_country', loc[2])
                              setValue('location_latitude', loc[3])
                              setValue('location_longitude', loc[4])
                              setValue("location_code", loc[5])
                              setLocationCity(loc[0])
                              setLocationState(loc[1])
                              setLocationCountry(loc[2])
                              setLocationLatitude(loc[3])
                              setLocationLongitude(loc[4])
                              setCityTicker(loc[5])
                            }

                            if(loc.length === 5) {

                              setValue('location_city', loc[0])
                              setValue('location_country', loc[1])
                              setValue('location_latitude', loc[2])
                              setValue('location_longitude', loc[3])
                              setValue("location_code", loc[4])
                              setLocationCity(loc[0])
                              setLocationCountry(loc[1])
                              setLocationLatitude(loc[2])
                              setLocationLongitude(loc[3])
                              setCityTicker(loc[4])
                            }


                          }
                        }}
                      />
                      <FormError>{errors.location_city?.message}</FormError> </>
                      : <>
                        {location_state ? <p>{location_city} {location_state} {location_country}</p> : <p>{location_city} {location_country}</p>}
                        <IconComp src="https://res.cloudinary.com/dba8ifej6/image/upload/v1653547266/edit_icon_cwggty.png" alt="Edit icon" style={{cursor: 'pointer'}} onClick={() => setEditFromCity(false)} />
                      </>
                    }
                  </FormInput50Width>

                  <FormInput50Width>
                      <FormLabelContainer>
                        <FormRequired>*</FormRequired>
                        <FormLabel>{t('Currency', language)}</FormLabel>
                      </FormLabelContainer>
                      <Select
                        {...register("currency")}
                        name="location"
                        options={slicedOptionsCur}
                        onInputChange={(value:string) => setInputValueCur(value)}
                        filterOption={() => true}
                        // styles={customStyles}
                        className="width80"
                        placeholder='Select currency'
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        onChange={(v:any) => {
                          if (isSelectOptionCur(v)) {
                            setValue('currency', v.value)
                            setCurrency(v.value)
                          }
                        }}
                      />
                      <FormError>{errors.currency?.message}</FormError>
                  </FormInput50Width>



                  <FormInput50Width>
                      <FormLabelContainer>
                        <FormRequired>*</FormRequired>
                        <FormLabel>{t(productNameLabel, language)}</FormLabel>
                      </FormLabelContainer>
                      <FormInputContainer>
                        <FormInput
                            {...register("classification")}
                            name="classification"
                            type="text"
                            placeholder={productNamePlaceholder}
                            aria-label='classification' />
                        <FormError>{errors.classification?.message}</FormError>
                      </FormInputContainer>

                  </FormInput50Width>
                  {showQuantity ?
                    <FormInput50Width>
                        <FormLabelContainer>
                          <FormRequired>*</FormRequired>
                          <FormLabel>{t('Quantity', language)}</FormLabel>
                        </FormLabelContainer>
                        <FormInput
                            {...register("quantity")}
                            name="quantity"
                            type="number"
                            placeholder='Enter quantity'
                            aria-label='quantity'
                            onChange={(text) => {
                              if(text.target.value) {
                                let as = parseInt(text.target.value);
                                setValue('quantity', as)
                              } else {
                                setValue('quantity', 0)
                              }
                            }} />
                        <FormError>{errors.quantity?.message}</FormError>
                    </FormInput50Width>
                    : null
                  }

                  {showUnit ?
                    <FormInput50Width>

                        <FormLabelContainer>
                          <FormLabel>{t('Unit', language)}</FormLabel>
                        </FormLabelContainer>

                        {selectOptionProductCategory !== "Services" && selectOptionProductCategory !== "Real Estate" ?
                          <FormInput
                              {...register("unit")}
                              name="unit"
                              type="text"
                              placeholder='Enter unit'
                              aria-label='unit' />
                          : null
                        }

                        {selectOptionProductCategory === "Services" ?
                          <Select
                            name="unit"
                            options={servicesUnitOption}
                            // styles={customStyles}
                            placeholder='Select unit'
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            onChange={(v:any) => {
                              setValue('unit', v.value)
                            }}
                          /> : null
                        }
                        <FormError>{errors.unit?.message}</FormError>

                    </FormInput50Width>
                    : null
                  }

                  <FormInput50Width>
                      <FormLabelContainer>
                        <FormLabel>{t(shopNameLabel, language)}</FormLabel>
                      </FormLabelContainer>
                      <FormInput
                          {...register("store")}
                          name="store"
                          type="text"
                          placeholder={shopNamePlaceholder}
                          aria-label='store' />
                      <FormError>{errors.store?.message}</FormError>

                  </FormInput50Width>

                  <FormInput50Width>

                      <FormLabelContainer>
                        <FormRequired>*</FormRequired>
                        <FormLabel>{selectOptionProductName === "Apartment" ? t('Monthly rent', language): t('Price', language)}</FormLabel>
                      </FormLabelContainer>
                      <FormInput
                          {...register("price")}
                          name="price"
                          min="0"
                          type="number"
                          placeholder='Enter price'
                          aria-label='price'
                          onChange={(text) => {
                            if(text.target.value) {
                              let as = parseInt(text.target.value);
                              setValue('price', as)
                            } else {
                              setValue('price', 0)
                            }
                          }}
                        />
                      <FormError>{errors.price?.message}</FormError>

                  </FormInput50Width>
                  
                  {showRetailServiceCheckbox ? 
                    <FormInput50Width>
                        <FormLabelContainer>
                          <FormRequired>*</FormRequired>
                          <FormLabel>{t('Type', language)}</FormLabel>
                        </FormLabelContainer>

                        <div style={{display: "flex"}}>
                          <div style={{display: "flex", alignItems: "center"}}>
                            <label htmlFor="retail" style={{marginRight: "1em"}}>
                              {t('RETAIL', language)}
                            </label>
                            <FormInput
                              //{...register("type")}
                              name="retail"
                              value="RETAIL"
                              checked={retailCheckbox}
                              onChange={() => validateTypeCheckBox("RETAIL")}
                              type="checkbox"
                              aria-label='type' />
                          </div>
                          <div style={{display: "flex", alignItems: "center"}}>
                            <label htmlFor="service" style={{margin: "0 1em"}}>
                              {t('SERVICE', language)}
                            </label>
                            <FormInput
                              //{...register("type")}
                              name="service"
                              value="SERVICE"
                              checked={serviceCheckbox}
                              onChange={() => validateTypeCheckBox("SERVICE")}
                              type="checkbox"
                              aria-label='type' />
                          </div>
                        </div>
                        <FormError>{errors.type?.message}</FormError>
                    </FormInput50Width>
                    :
                    null 
                  }

                </TwoColumn70Container>
              </TwoColumnContainer>
              <div style={{padding: '2em'}}>
                <div style={{backgroundColor: '#263238', color: '#FFF', padding: '1em'}}>
                  <FormLabel>{t('Description', language)}</FormLabel>
                </div>
                <FormTextArea
                    {...register("description")}
                    name="description"
                    className="formTextArea"
                    placeholder='Enter description for this price record'
                    aria-label='description'
                    onChange={(text) => handleDescriptionChange(text)} />

                <LoginButtonWrapper>
                    <Button type="submit" color='secondaryRed' disabled={isSubmitPriceRecordFetching ? true : false}>{t("Submit", language)}</Button>
                </LoginButtonWrapper>
              </div>


            </>
              :
              null
          }

      </form>
  )
}

export default CreatePriceRecordForm;
