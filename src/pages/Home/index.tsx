import React from 'react'
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import { WhatIsContainerTitle, WhatIsTitle } from './styles';
import { CommonContainer, CommonContentContainer, HeaderContainer, BodyContainer } from '../../globalStyles'

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
          </BodyContainer>
        </CommonContentContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default Home;
