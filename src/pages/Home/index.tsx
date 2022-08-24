import React from 'react'
import Carousel from '../../components/Carousel';
import Timeline from '../../components/Timeline';
import Features from '../../components/Features';
import Categories from '../../components/Categories';
import ProductComparison from '../../components/ProductComparison';
import SearchProduct from '../../components/SearchProduct';
import Footer from '../../components/Footer';
import { WhatIsContainerTitle, WhatIsTitle } from './styles';
import { CommonContainer, CommonContentContainer, HeaderContainer, BodyContainer, HomeFLowImage} from '../../globalStyles'

function Home() {

  return (
    <>
      <CommonContainer>
        <CommonContentContainer>
          <HeaderContainer>
            <Carousel />
          </HeaderContainer>

          <BodyContainer>
            <div>
              <WhatIsContainerTitle>
                <WhatIsTitle className="text-underline">WHAT IS NOOMER?</WhatIsTitle>
              </WhatIsContainerTitle>
              <div className="section-content-container bg-beige">
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

            <Timeline />

            <HomeFLowImage src="https://res.cloudinary.com/dba8ifej6/image/upload/v1661142744/Landing-Flow-Image_klmpun.png" />

            <Features />
            <ProductComparison />
            <SearchProduct />
            <Categories />
          </BodyContainer>
        </CommonContentContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default Home;
