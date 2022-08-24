import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

import Footer from '../../components/Footer';
import { CommonContainer, CommonContentContainer, HeaderContainer, BodyContainer } from '../../globalStyles'

function Listing() {

  const { selectedCategory } = useSelector((state: RootState) => state.category)
  console.log("category: ", selectedCategory)
  return (
    <>
      <CommonContainer>
        <CommonContentContainer>
          <HeaderContainer>
            selected category {selectedCategory}
          </HeaderContainer>

        </CommonContentContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default Listing;
