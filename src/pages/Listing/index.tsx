import React from 'react'

import Footer from '../../components/Footer';
import { CommonContainer, CommonContentContainer, HeaderContainer, BodyContainer } from '../../globalStyles'

function Listing() {

  return (
    <>
      <CommonContainer>
        <CommonContentContainer>
          <HeaderContainer>
            <Carousel />
          </HeaderContainer>

        </CommonContentContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default Listing;
