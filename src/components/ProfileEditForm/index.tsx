import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import escapeRegExp from "lodash/escapeRegExp";
import Select from "react-select";
import Avatar from 'react-avatar-edit'
import useProfileEditForm from '../../hooks/useProfileEditForm';
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import {
  AvatarContainerPC,
  AvatarContainerMobile,
  ProfileInput,
  ButtonContainerProfile,
  ChangeImageContainer,
  PLink,
  IfUs,
  ProfileImageContainer,
  ProfileImg
} from './styles'
import Button from '../Button'
import Alert from '../AlertMessage'
import {
  FormError,
  FormInputWhole,
  FormLabel,
  FormLabelContainer,
  TwoColumnContainer,
  TwoColumnChildren
} from '../../globalStyles';
import { getAllCities, getAllCurrencies } from '../../features/selectOptionsSlice'
//import getBase64 from '../../utils/base64'
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

function ProfileEditForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { language } = useSelector((state: RootState) => state.language)
  const {
    locationSelectOption,
    currencySelectOption,
    isGetLocationsFetching,
    isGetCurrenciesFetching
  } = useSelector((state: RootState) => state.selectOptions)

  const { register, setValue, onSubmit, errors, apistatus, apimessage } = useProfileEditForm();

  const { dashboard } = useSelector((state: RootState) => state.dashboard)

  const [inputValue, setInputValue] = useState<string>('')
  const [location_city, setLocationCity] = useState<string>('');
  const [location_state, setLocationState] = useState<string>('');
  const [location_country, setLocationCountry] = useState<string>('');
  const [location_latitude, setLocationLatitude] = useState<string>('');
  const [location_longitude, setLocationLongitude] = useState<string>('');

  const [savedLocationOptionValue, setSavedLocationOptionValue] = useState({label: "", value: ""})

  const [previewProfileImage, setPreviewProfileImage] = useState<File | any>(null)

  /** Profile image upload **/
  const [showImageUpload, setShowImageUpload] = useState(false)

  function onClose() {
     console.log("")
  }
  function onCrop(pv:any) {
     setPreviewProfileImage(pv);

     urlToFile(pv, 'a.png')
      .then((file)=>{
        setValue('profile_pic', file)
      });

  }
  function onBeforeFileLoad(elem:any) {
     if (elem.target.files[0].size > 2000000) {
       alert("File is too big!");
       elem.target.value = "";
     }
  }
  /** End of Profile image upload **/

  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    if(locationSelectOption.length === 0)dispatch(getAllCities('cities'))
    if(currencySelectOption.length === 0)dispatch(getAllCurrencies('currencies'))
  }, []);

  useEffect(() => {
    if (dashboard) {
      if (dashboard.profile) {
        setValue("profileId", dashboard.profile._id)
        setValue("userId", dashboard.profile.user)

        if (dashboard.profile && dashboard.profile.first_name) {
          setValue("first_name", dashboard.profile.first_name)
        }
        if (dashboard.profile && dashboard.profile.last_name) {
          setValue("last_name", dashboard.profile.last_name)
        }
        if (dashboard.profile && dashboard.profile.city) {
          setValue("city", dashboard.profile.city)
        }
        if (dashboard.profile && dashboard.profile.state) {
          setValue("state", dashboard.profile.state)
        }
        if (dashboard.profile && dashboard.profile.country) {
          setValue("country", dashboard.profile.country)
        }
        if (dashboard.profile && dashboard.profile.latitude) {
          setValue("latitude", dashboard.profile.latitude)
        }
        if (dashboard.profile && dashboard.profile.longitude) {
          setValue("longitude", dashboard.profile.longitude)
        }
        if (dashboard.profile && dashboard.profile.phone_number) {
          setValue("phone_number", dashboard.profile.phone_number)
        }
        if (dashboard.profile && dashboard.profile.profile_pic !== "undefined") {
          setValue("profile_pic", dashboard.profile.profile_pic)
          setPreviewProfileImage(dashboard.profile.profile_pic)
        }

        if (dashboard.profile.city) {
          let savedLocation = dashboard.profile.state !== "undefined" ? `${dashboard.profile.city}, ${dashboard.profile.state}, ${dashboard.profile.country}` : `${dashboard.profile.city}, ${dashboard.profile.country}`
          console.log("savedLocation: ", savedLocation)
          let locationValue = ""
          if (locationSelectOption) {
            for(let i=0; i < locationSelectOption.length; i++) {
              if (locationSelectOption[i].label === savedLocation) {
                locationValue = locationSelectOption[i].value;
                console.log("locationValue: ", locationValue)
                setSavedLocationOptionValue({label: savedLocation, value: locationValue})
                break
              }
            }

          }
        }
      }
    }
  }, [dashboard, setValue]);


  const customStyles = {
    option: (styles: any) => ({
      ...styles,
      fontSize: '14px',
      padding: 8,
      cursor: 'pointer'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
      border: '1px solid #C4C4C4',
      // borderRadius: '5px',
      fontSize: '14px',
      marginBottom: '20px',
      backgroundColor: '#FFF',
      height: '32px',
      display: 'flex'
    })
  }

  const customStylesCity = {
    option: (styles: any) => ({
      ...styles,
      fontSize: '14px',
      padding: 8,
      cursor: 'pointer'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: 200,
      border: '1px solid #C4C4C4',
      // borderRadius: '5px',
      fontSize: '14px',
      height: '32px',
      display: 'flex'
    })
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

  const isSelectOption = (v: any): v is SelectOption => {
    if ((v as SelectOption).value !== undefined) return v.value
    return false
  }

  return (
    <form onSubmit={onSubmit} aria-label="form">

      <ProfileImageContainer>
        {previewProfileImage ?
          <ProfileImg background={previewProfileImage} />
          :
          <ProfileImg background={'https://res.cloudinary.com/dba8ifej6/image/upload/v1644472150/default_user_bw3qde.png'} />
        }
      </ProfileImageContainer>

      <ChangeImageContainer>
        <label htmlFor="profile_pic" style={{cursor: 'pointer'}} onClick={() => setShowImageUpload(!showImageUpload)}>Change Image</label>

        {showImageUpload && <>
          <AvatarContainerPC>
            <Avatar
              width={600}
              height={300}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={''}
            />
          </AvatarContainerPC>
          <AvatarContainerMobile>
            <Avatar
              width={300}
              height={200}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={''}
            />
          </AvatarContainerMobile>
        </>}
      </ChangeImageContainer>

      { userEmail ?
        <>
          <FormLabelContainer>
            <FormLabel>{t("Email address", language)}</FormLabel>
          </FormLabelContainer>
          <FormInputWhole type='text' required = {true} disabled = {true} value={userEmail} className="formTextArea"/>
        </>
        :
        <>
          <FormLabelContainer>
            <FormLabel>{t("Email address", language)}</FormLabel>
          </FormLabelContainer>
          <ProfileInput type='text' required = {true} disabled = {true} className="formTextArea"/>
        </>
      }

      <TwoColumnContainer>
        <TwoColumnChildren>
          <FormLabelContainer>
            <FormLabel>{t("First name", language)}</FormLabel>
          </FormLabelContainer>
          <FormInputWhole
            {...register("first_name")}
            name="first_name"
            type="text"
            className="formInputProfile"
            placeholder='Enter first name'
            aria-label='Enter first name' />
          <p>{errors.first_name?.message}</p>
        </TwoColumnChildren>

        <TwoColumnChildren>
          <FormLabelContainer>
            <FormLabel>{t("Last name", language)}</FormLabel>
          </FormLabelContainer>
          <FormInputWhole
            {...register("last_name")}
            name="last_name"
            type="text"
            className="formInputProfile"
            placeholder='Enter last name'
            aria-label='Enter last name' />
          <p>{errors.last_name?.message}</p>
        </TwoColumnChildren>
      </TwoColumnContainer>

      <FormLabelContainer>
        <FormLabel>{t("Phone number", language)}</FormLabel>
      </FormLabelContainer>
      <FormInputWhole
        {...register("phone_number")}
        name="phone_number"
        type="text"
        className="formTextArea"
        placeholder={dashboard.profile && dashboard.profile.phone_number ? dashboard.profile.phone_number : 'Enter phone number'}
        aria-label='Enter phone number' />
      <p>{errors.phone_number?.message}</p>

      {dashboard.profile.city && dashboard.profile.city !== "undefined" && savedLocationOptionValue.label !== "" &&
        <>
          <FormLabelContainer>
            <FormLabel>{t("Location", language)}</FormLabel>
          </FormLabelContainer>
          <Select
            name="location"
            options={slicedOptions}
            defaultValue={savedLocationOptionValue}
            onInputChange={(value) => setInputValue(value)}
            filterOption={() => true}
            styles={customStyles}
            placeholder='Location'
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            onChange={(v) => {
              if (isSelectOption(v)) {
                const loc = v.value.split(',')

                if(loc.length === 6) {

                  setValue('city', loc[0])
                  setValue('state', loc[1])
                  setValue('country', loc[2])
                  setValue('latitude', loc[3])
                  setValue('longitude', loc[4])
                  setLocationCity(loc[0])
                  setLocationState(loc[1])
                  setLocationCountry(loc[2])
                  setLocationLatitude(loc[3])
                  setLocationLongitude(loc[4])
                }

                if(loc.length === 5) {

                  setValue('city', loc[0])
                  setValue('country', loc[1])
                  setValue('latitude', loc[2])
                  setValue('longitude', loc[3])
                  setLocationCity(loc[0])
                  setLocationCountry(loc[1])
                  setLocationLatitude(loc[2])
                  setLocationLongitude(loc[3])
                }


              }
            }}
          />
        </>
      }

      {!dashboard.profile.hasOwnProperty("city") || !dashboard.profile.city || dashboard.profile.city === "undefined" ?
        <>
          <FormLabelContainer>
            <FormLabel>{t("Location", language)}</FormLabel>
          </FormLabelContainer>
          <Select
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

                  setValue('city', loc[0])
                  setValue('state', loc[1])
                  setValue('country', loc[2])
                  setValue('latitude', loc[3])
                  setValue('longitude', loc[4])
                  setLocationCity(loc[0])
                  setLocationState(loc[1])
                  setLocationCountry(loc[2])
                  setLocationLatitude(loc[3])
                  setLocationLongitude(loc[4])
                }

                if(loc.length === 5) {

                  setValue('city', loc[0])
                  setValue('country', loc[1])
                  setValue('latitude', loc[2])
                  setValue('longitude', loc[3])
                  setLocationCity(loc[0])
                  setLocationCountry(loc[1])
                  setLocationLatitude(loc[2])
                  setLocationLongitude(loc[3])
                }


              }
            }}
          />
        </> : null
      }
      <FormError>{errors.city?.message}</FormError>

      <p>{errors.profile_pic?.message}</p>
      <ButtonContainerProfile>
        <PLink onClick={() => navigate(-1)}>Cancel</PLink>
        <Button type="submit" onClick={() => setShowImageUpload(false)} color="noomerRed">{t("Save Changes", language)}</Button>
      </ButtonContainerProfile>
    </form >
  )
}

export default ProfileEditForm;


// {apimessage ?
//   <Alert
//     text={apimessage}
//     bgColor={apistatus === "SUCCESS" ? "#d4edda" : "#f8d7da"}
//     txtColor={apistatus === "SUCCESS" ? "#155724" : "#721c24"}
//   /> : null
// }
