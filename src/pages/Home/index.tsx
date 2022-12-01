import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../../app/store'
import { getDisplay } from '../../features/configSlice'

import TickerSlider from '../../components/TickerSlider';
import {HeaderCarousel} from '../../components/Carousel';
import Timeline from '../../components/Timeline';
import Features from '../../components/Features';
import Categories from '../../components/Categories';
import ProductComparison from '../../components/ProductComparison';
import SearchProduct from '../../components/SearchProduct';
import Footer from '../../components/Footer';
import { WhatIsContainerTitle, WhatIsTitle } from './styles';
import { CommonContainer, CommonContentContainer, CarouselContainer, BodyContainer, HomeFLowImage} from '../../globalStyles'

import { getAllCities, getAllCurrencies, getAllProducts } from '../../features/selectOptionsSlice'

function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { display } = useSelector((state: RootState) => state.config)
  const [featuresCarousel, setFeaturesCarousel] = useState('HIDE')
  const [whatIsNoomer, setWhatIsNoomer] = useState('HIDE')
  const [priceTimeline, setPriceTimeline] = useState('HIDE')
  const [appFlow, setAppFlow] = useState('HIDE')
  const [appFeatures, setAppFeatures] = useState('HIDE')
  const [priceComparison, setPriceComparison] = useState('HIDE')
  const [searchCommodity, setSearchCommodity] = useState('HIDE')
  const [categoriesSection, setCategoriesSection] = useState('HIDE')

  const {
    productSelectOption,
    locationSelectOption,
    currencySelectOption,
    isGetLocationsFetching,
    isGetCurrenciesFetching,
    isGetProductsFetching
  } = useSelector((state: RootState) => state.selectOptions)


  /**
    Fetching sections to display
  **/
  useEffect(() => {
    dispatch(getDisplay('display'));
  }, [dispatch]);

  useEffect(() => {
    if (display) {
      setFeaturesCarousel(display.Landing_Features_Carousel)
      setWhatIsNoomer(display.Landing_What_is_Noomer)
      setPriceTimeline(display.Landing_Price_Timeline)
      setAppFlow(display.Landing_App_Flow)
      setAppFeatures(display.Landing_App_Features)
      setPriceComparison(display.Landing_Price_Comparison)
      setSearchCommodity(display.Landing_Search_Commodity)
      setCategoriesSection(display.Landing_Categories)
    }
  }, [display]);
  /***/

  /**
    Fetching select options to optimize speed in
    loading options in the Submit price record form
  **/
  useEffect(() => {
    if(locationSelectOption.length === 0 && !isGetLocationsFetching)dispatch(getAllCities('cities'))
    if(productSelectOption.length === 0 && !isGetProductsFetching)dispatch(getAllProducts('products'))
    if(currencySelectOption.length === 0 && !isGetCurrenciesFetching)dispatch(getAllCurrencies('currencies'))
  }, []);
  /****/

  return (
    <>
      <CommonContainer>
        <CommonContentContainer>
          <TickerSlider />
          {featuresCarousel === "SHOW" ?
            <CarouselContainer>
              <HeaderCarousel />
            </CarouselContainer>
            : null
          }

          <BodyContainer>

            <div style={{marginBottom: "2em"}}>
              <img
                src="https://res.cloudinary.com/dba8ifej6/image/upload/v1669908057/promo-landing-new_vgykdt.png"
                onClick={()=> navigate('/promo') }
                 className="responsiveImg"
                style={{cursor: 'pointer'}}
              />
            </div>

            {whatIsNoomer === "SHOW" ?
              <div className="bg-darkblue">
                <WhatIsContainerTitle>
                  <WhatIsTitle className="text-underline">WHAT IS NOOMER?</WhatIsTitle>
                </WhatIsContainerTitle>
                <div className="section-content-container white-font">
                  <div style={{paddingBottom: '2rem'}}>
                    Noomer is a price comparison website that seeks to offer solutions for prospective buyers/ consumers
                    around the world. Prices for basic commodities tend to vary from city to city and  country to country.
                    These price variations can be dependent on the economic status of the country PPI,inflation, average salaries, etc.
                  </div>
                  <div>
                    As many contracts and deals require a unit of account, a numeraire is becoming more often used.
                    The platform aims to maintain a set of prices on local goods which could be used as a unit of
                    account for contracts.
                  </div>
                </div>
              </div>
              : null
            }

            {priceTimeline === "SHOW" ? <Timeline /> : null}

            {appFlow === "SHOW" ?
              <HomeFLowImage src="https://res.cloudinary.com/dba8ifej6/image/upload/v1661142744/Landing-Flow-Image_klmpun.png" />
              : null
            }

            {appFeatures === "SHOW" ? <Features /> : null}
            {priceComparison === "SHOW" ? <ProductComparison /> : null}
            {searchCommodity === "SHOW" ? <SearchProduct /> : null}
            {categoriesSection === "SHOW" ? <Categories /> : null}
          </BodyContainer>
        </CommonContentContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default Home;
