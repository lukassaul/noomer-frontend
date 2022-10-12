import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { HeaderContainer } from './styles'

function ListingHeader() {

  let { selectedCategory } = useSelector((state: RootState) => state.category)

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
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465678/header-category-beverage_b7kr4v.png",
    },
    Livestock: {
      title: "LIVESTOCK",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465679/header-category-livestock1_fbsqyv.png",
    },
    Tobacco: {
      title: "TOBACCO",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1664348910/header-category-tobacco_m4ctgn.jpg",
    },
    Metals: {
      title: "METALS",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665467478/header-category-metals_rfvbb5.png",
    },
    Currency: {
      title: "CURRENCY",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465678/header-category-currency_gtt91r.png",
    },
    Services: {
      title: "SERVICES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465680/header-category-service_oqainv.png",
    },
    Transportation: {
      title: "TRANSPORTATION",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465680/header-category-transportation_o8acpz.png",
    },
    Real_Estate: {
      title: "REAL ESTATE",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465680/header-category-real-estate_oeoslw.png",
    },
    Water: {
      title: "WATER",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465680/header-category-water_ttkuie.png",
    },
    Wearable_Technology: {
      title: "WEARABLE TECHNOLOGY",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465680/header-category-wearable-tech_vsyjdy.png",
    },
    Medicine: {
      title: "Medicine and Health Supplements",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465680/header-category-medicine_a57l7o.png",
    },
    Energy: {
      title: "ENERGY",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465679/header-category-energy_id6i84.png",
    },
    Grains: {
      title: "GRAINS",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465679/header-category-grains_bf1zp1.png",
    },
    Electronic_Devices: {
      title: "ELECTRONIC DEVICES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465679/header-category-electronic-device_oavjde.png",
    },
    Furnitures: {
      title: "FURNITURES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465679/header-category-furniture_y36twi.png",
    },
    Gasoline: {
      title: "GASOLINE",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465679/header-category-gasoline_crzvoc.png",
    },
    Coffee: {
      title: "COFFEE",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465678/header-category-coffee_tnqybz.png",
    },
    Clothing: {
      title: "CLOTHING",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465678/header-category-clothing_tsposs.png",
    },
    Appliances: {
      title: "APPLIANCES",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465678/header-category-appliances_bxrohu.png",
    },
    Agricultural_Goods: {
      title: "AGRICULTURAL GOODS",
      imageUrl: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665465678/header-category-agricultural_vib9ib.png",
    }
  }
  console.log("selectedCategory: ", selectedCategory)

  if (selectedCategory === "") selectedCategory = "All"
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
