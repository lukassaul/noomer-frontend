import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer';
import {
  CenteredContainer,
  CommonContainer,
  Container
} from '../../globalStyles'

function CategoriesHome() {

  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <Container>

            <Categories />

          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default CategoriesHome;
