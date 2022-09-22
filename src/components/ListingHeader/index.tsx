import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { HeaderContainer } from './styles'

function ListingHeader() {

  const { selectedCategory } = useSelector((state: RootState) => state.category)

//   Currencies
// Services
// Metals
// Transportation
// Tobacco
// Livestock
// Rentals
// Food

  const categoriesArray:any = {
    All: {
      title: "Categories",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    },
    Food: {
      title: "FOOD",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-food_hzid87.png",
    },
    Beverages: {
      title: "BEVERAGES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    },
    Livestock: {
      title: "LIVESTOCK",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-livestock_zdf9ek.png",
    },
    Tobacco: {
      title: "TOBACCO",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-tobacco_p0oynn.png",
    },
    Metals: {
      title: "METALS",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    },
    Currencies: {
      title: "CURRENCIES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    },
    Services: {
      title: "SERVICES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    },
    Transportation: {
      title: "TRANSPORTATION",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    },
    Rentals: {
      title: "RENTALS",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661492906/header-category-all_teuus9.jpg",
    }
  }

  let bgImage = categoriesArray[selectedCategory]
  let backgroundImage = bgImage.imageUrl
  let headerTitle = bgImage.title
  return (
    <HeaderContainer backgroundImage={backgroundImage}>
      <p>{headerTitle}</p>
    </HeaderContainer>
  )
}

export default ListingHeader;
