import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { t } from '../../i18n';
import { useNavigate } from 'react-router-dom'
import Select from "react-select";
import { RootState, AppDispatch } from '../../app/store'
import { getSelections, postNumeraire } from '../../features/noomerSlice'

import { FlexCenterHoriVertContainer, FlexCenterContainer } from '../../globalStyles'
import { SelectContainer, SectionContainer, DesktopResultWrapper, MobileResultWrapper, NoomerErrorMessage } from './styles'
import Button from "../Button";

const customStyles = {
  option: (baseStyles: any) => ({
    ...baseStyles,
    fontSize: '14px',
    padding: 10,
    cursor: 'pointer',
    color: '#263238 !important',
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',
    border: '1px solid #c4c4c4',
    borderRadius: '5px',
    backgroundColor: '#FFF',
    color: '#263238 !important',
    fontSize: '14px',
    margin: '10px 0',
    height: '32px'
  })
}

type Result = {
  product: string,
  avg_price: Number,
  currency: string,
  category: string,
  toBaseUnit: string
}

type SelectOptions = {
  label: string,
  value: string
}

function Numeraire() {
  const { language } = useSelector((state: RootState) => state.language)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    noomer,
    noomerSelections,
    isSubmitNoomerFetching,
    isSubmitNoomerSuccess,
    errorSubmitNoomerMessage
   } = useSelector((state: RootState) => state.numeraire)

  const [baseUnit, setBaseUnit] = useState([])
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])

  const [initialBaseUnit, setInitialBaseUnit] = useState<SelectOptions>()
  const [initialCategory, setInitialCategory] = useState<SelectOptions>()
  const [initialLocation, setInitialLocation] = useState<SelectOptions>()

  const [noomerResult, setNoomerResult] = useState<Result[]>([])

  const [selectedBaseUnit, setSelectedBaseUnit] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  const [buttonDisabled, setButtonDisabled] = useState(true)


  useEffect(() => {
    if (!noomerSelections.hasOwnProperty('units'))
      dispatch(getSelections('selections'))
    else {
      setBaseUnit(noomerSelections.units)
      setCategories(noomerSelections.categories)
      setLocations(noomerSelections.locations)
    }

  }, [noomerSelections, dispatch])

  useEffect(() => {
    if(!initialBaseUnit && baseUnit && baseUnit.length > 0) baseUnit.map((unit: SelectOptions) => {
      if(unit.label === 'bitcoin') {
        setInitialBaseUnit(unit)
        setSelectedBaseUnit(unit.value)
      }
    })

    if(!initialCategory && categories && categories.length > 0)categories.map((cat: SelectOptions) => {
      if(cat.label === 'Services') {
        setInitialCategory(cat)
        setSelectedCategory(cat.value)
      }
    })

    if(!initialLocation && locations && locations.length > 0)locations.map((loc: SelectOptions) => {
      if(loc.label === 'Philippines') {
        setInitialLocation(loc)
        setSelectedLocation(loc.value)
      }
    })
  }, [baseUnit, categories, locations])

  useEffect(() => {
    if (initialBaseUnit && initialCategory && initialLocation) {
      let data = {
        baseUnit: initialBaseUnit.value,
        country: initialLocation.value,
        category: initialCategory.value
      }

      dispatch(postNumeraire(data))
    }
  }, [initialBaseUnit, initialCategory, initialLocation])



  useEffect(() => {
    if (selectedBaseUnit && selectedCategory && selectedLocation)
      setButtonDisabled(false)
  }, [selectedBaseUnit, selectedCategory, selectedLocation])

  const handleNoomerSubmit = async(e: any) => {
    e.preventDefault()

    let data = {
      baseUnit: selectedBaseUnit,
      country: selectedLocation,
      category: selectedCategory
    }

    dispatch(postNumeraire(data))
  }

  return (
    <div className="bg-darkblue" style={{width: '100%', paddingBottom: '2em', color: 'white'}}>
      {noomerSelections.hasOwnProperty('units') ?
        <form onSubmit={handleNoomerSubmit} aria-label="form">
          <SectionContainer>
            <FlexCenterHoriVertContainer style={{width: '100%'}}>
              <SelectContainer>
                <p>Base Unit</p>
                {initialBaseUnit && baseUnit ? <Select
                  name="baseUnit"
                  options={baseUnit}
                  defaultValue={initialBaseUnit}
                  styles={customStyles}
                  placeholder='Select base unit'
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  onChange={(v:any) => {
                    setSelectedBaseUnit(v.value)
                  }}
                /> : null}
              </SelectContainer>

              <SelectContainer>
                <p>Category</p>
                {initialCategory && categories ? <Select
                  name="category"
                  options={categories}
                  defaultValue={initialCategory}
                  styles={customStyles}
                  placeholder='Select category'
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  onChange={(v:any) => {
                    setSelectedCategory(v.value)
                  }}
                /> : null}
              </SelectContainer>

              <SelectContainer>
                <p>Location</p>
                {initialLocation && locations ? <Select
                  name="location"
                  options={locations}
                  defaultValue={initialLocation}
                  styles={customStyles}
                  placeholder='Select location'
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  onChange={(v:any) => {
                    setSelectedLocation(v.value)
                  }}
                /> : null}
              </SelectContainer>


                <Button color="noomerRed" disabled={buttonDisabled}>{t('Button_Proceed', language)}</Button>

            </FlexCenterHoriVertContainer>
          </SectionContainer>
        </form>
        :
        null
      }

      {errorSubmitNoomerMessage ?
        <FlexCenterContainer>
          <NoomerErrorMessage>{errorSubmitNoomerMessage}</NoomerErrorMessage>
        </FlexCenterContainer>
        : null
      }

      {Object.keys(noomer).length > 0 ?
        <FlexCenterContainer>
          <DesktopResultWrapper>
            <table className="table table-whitebg">
              <thead>
                  <tr>
                      <th>Commodity</th>
                      <th colSpan={2}>Average Price</th>
                      <th>Equivalent to base unit</th>
                  </tr>
              </thead>
              <tbody>
                {noomer.map((row: any, i: any) => {
                  return (
                    <tr key={i}>
                        <td>{row.product}</td>
                        <td style={{textAlign: "center"}}>{row.avg_price_loc} {row.local_currency}</td>
                        <td style={{textAlign: "center"}}>{row.avg_price_usd} {row.currency}</td>
                        <td style={{textAlign: "center"}}>{row.toBaseUnit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DesktopResultWrapper>
          <MobileResultWrapper>
            <table className="table" style={{fontSize: '10px'}}>
              <tbody>
                {noomer.map((row: any, i: any) => {

                  return (<tr>
                      <td>
                        <p>Commodity: {row.product}</p>
                        <p>Average Price: {row.avg_price} {row.currency}</p>
                        <p>Base unit equivalent: {row.toBaseUnit}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </MobileResultWrapper>
        </FlexCenterContainer>
        :
        null
      }
    </div>
  )
}

export default Numeraire;
