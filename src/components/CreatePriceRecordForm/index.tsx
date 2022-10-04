import React, { useMemo, useState, useEffect } from 'react'
import usePriceRecordForm from '../../hooks/usePriceRecordForm';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Select from "react-select";
import escapeRegExp from "lodash/escapeRegExp";
import { RootState, AppDispatch } from '../../app/store'
import { t } from '../../i18n'
import { getAllCities, getAllCurrencies, getAllProducts } from '../../features/selectOptionsSlice'
import {
  LoginButtonWrapper,
  WholeWrapper,
} from './styles'
import {
  IconComp,
  ImagePreview,
  CenteredContainer,
  FormInput,
  FormTextArea,
  FormError,
  TitleTwo,
  FlexContainer,
  FlexCenterColContainer,
  MainFlexContainerColumn,
  MainFlexContainerRow,
  FormLabelContainer,
  FormLabel,
  FormRequired,
  FormThreeInputContainer,
  FormInput40Width,
  FormInput30Width,
  FormInput20Width,
  SelectContainer
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

function CreatePriceRecordForm() {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()

  const { language } = useSelector((state: RootState) => state.language)
  const {
    productSelectOption,
    locationSelectOption,
    currencySelectOption,
    isGetLocationsFetching,
    isGetCurrenciesFetching,
    isGetProductsFetching
  } = useSelector((state: RootState) => state.selectOptions)


  const { register, control, setValue, onSubmit, errors } = usePriceRecordForm();

  const [inputValue, setInputValue] = useState<string>('')
  const [inputValueCur, setInputValueCur] = useState<string>('')
  const [inputValueProd, setInputValueProd] = useState<string>('')

  const [productCategory, setProductCategory] = useState<string>('');
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
      // none of react-select's styles are passed to <Control />
      width: '80%',
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
    dispatch(getAllCities('cities'))
    dispatch(getAllProducts('products'))
    dispatch(getAllCurrencies('currencies'))
  }, []);


  const saveImage = async (e: any) => {
    e.preventDefault()
    const imagePriceRecord = await imageProcessor(e.target.files[0])
    console.log("imagePriceRecord: ", imagePriceRecord)
    setPriceRecordImage(imagePriceRecord)

    urlToFile(imagePriceRecord, 'product.png')
     .then((file)=>{
       console.log("urlToFile file: ", file)
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

  console.log("form errors: ", errors)

  return (
      <form onSubmit={onSubmit} aria-label="form">

              <TitleTwo style={{textAlign: 'center'}}>{t("Submit new price record", language)}</TitleTwo>

              {priceRecordImage ? <CenteredContainer><ImagePreview src={priceRecordImage} /></CenteredContainer> : null}

              <FormLabelContainer>
                <FormLabel>{t('Upload product image', language)}</FormLabel>
              </FormLabelContainer>
              <input
                //{...register("product_image")}
                type="file"
                name='product_image'
                accept="image/*"
                style={{ marginBottom: '1em', marginTop: '10px' }}
                onChange={saveImage}
                />

              <FormThreeInputContainer>
                <FormInput30Width>
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
                      styles={customStyles}
                      placeholder='Location'
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
                </FormInput30Width>

                <FormInput30Width>
                  {!ed_location_city ? <>
                    <FormLabelContainer>
                      <FormRequired>*</FormRequired>
                      <FormLabel>{t('Product Category', language)}</FormLabel>
                    </FormLabelContainer>
                    <Select
                      {...register("product")}
                      name="product"
                      options={slicedOptionsProd}
                      onInputChange={(value) => setInputValueProd(value)}
                      filterOption={() => true}
                      styles={customStyles}
                      placeholder='Product category'
                      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                      onChange={(v) => {
                        if (isSelectOptionProd(v)) {
                          setValue('product', v.value)
                          setProductCategory(v.value)
                        }
                      }}
                    />
                    <FormError>{errors.product?.message}</FormError> </>
                    : <>
                      <p>{productCategory}</p>
                      <IconComp src="https://res.cloudinary.com/dba8ifej6/image/upload/v1653547266/edit_icon_cwggty.png" alt="Edit icon" style={{cursor: 'pointer'}} onClick={() => setEditFromCity(false)} />
                    </>
                  }
                </FormInput30Width>

                <FormInput30Width>
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
                      styles={customStyles}
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
                </FormInput30Width>
              </FormThreeInputContainer>

              <FormThreeInputContainer>
                <FormInput30Width>
                    <FormLabelContainer>
                      <FormRequired>*</FormRequired>
                      <FormLabel>{t('Product Name', language)}</FormLabel>
                    </FormLabelContainer>
                    <FormInput
                        {...register("classification")}
                        name="classification"
                        type="text"
                        placeholder='Enter product name'
                        aria-label='classification' />
                    <FormError>{errors.classification?.message}</FormError>

                </FormInput30Width>

                <FormInput30Width>
                    <FormLabelContainer>
                      <FormRequired>*</FormRequired>
                      <FormLabel>{t('Quantity', language)}</FormLabel>
                    </FormLabelContainer>
                    <FormInput
                        {...register("quantity")}
                        name="quantity"
                        type="number"
                        placeholder='Enter quantity'
                        aria-label='quantity' />
                    <FormError>{errors.quantity?.message}</FormError>
                </FormInput30Width>

                <FormInput30Width>

                    <FormLabelContainer>
                      <FormLabel>{t('Unit', language)}</FormLabel>
                    </FormLabelContainer>
                    <FormInput
                        {...register("unit")}
                        name="unit"
                        type="text"
                        placeholder='Enter unit'
                        aria-label='unit' />
                    <FormError>{errors.unit?.message}</FormError>

                </FormInput30Width>
              </FormThreeInputContainer>

              <FormThreeInputContainer>
                <FormInput30Width>
                    <FormLabelContainer>
                      <FormLabel>{t('Shop Name', language)}</FormLabel>
                    </FormLabelContainer>
                    <FormInput
                        {...register("store")}
                        name="store"
                        type="text"
                        placeholder='Enter shop name'
                        aria-label='store' />
                    <FormError>{errors.store?.message}</FormError>

                </FormInput30Width>

                <FormInput30Width>

                    <FormLabelContainer>
                      <FormRequired>*</FormRequired>
                      <FormLabel>{t('Price', language)}</FormLabel>
                    </FormLabelContainer>
                    <FormInput
                        {...register("price")}
                        name="price"
                        type="number"
                        placeholder='Enter price'
                        aria-label='price' />
                    <FormError>{errors.price?.message}</FormError>

                </FormInput30Width>

                <FormInput30Width>
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
                </FormInput30Width>
              </FormThreeInputContainer>

              <FormLabelContainer>
                <FormLabel>{t('Description', language)}</FormLabel>
              </FormLabelContainer>
              <FormTextArea
                  {...register("description")}
                  name="description"
                  className="formTextArea"
                  placeholder='Enter description for this price record'
                  aria-label='description'
                  onChange={(text) => handleDescriptionChange(text)} />

              <LoginButtonWrapper>
                  <Button type="submit" color='gray'>{t("Submit", language)}</Button>
              </LoginButtonWrapper>

      </form>
  )
}

export default CreatePriceRecordForm;
