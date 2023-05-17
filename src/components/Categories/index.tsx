import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { setCategory } from '../../features/categorySlice'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { CategoriesContainer,
  CategoriesRow,
  CategoriesColumn,
  CategoryContainer,
  CategoryImage,
  CategoryLabel
} from './styles';
import {
  CenteredTitle32,
  RightLinkContainer,
  LeftLinkContainer,
  LinkParagraph
} from '../../globalStyles'

function Categories() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [categoriesToShow, setCategoriesToShow] = useState("LANDING")

  useEffect(() => {
    let pathname = location.pathname
    if (pathname === "/") setCategoriesToShow("LANDING")
    if (pathname === "/categories") setCategoriesToShow("HOME")
  }, [])


  const categoriesArrayLanding = [
    {
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-currency_ss2avi.png",
      label: "Currency",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-services_wgiz3r.png",
      label: "Gasoline",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-metals_npidyj.png",
      label: "Metals",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036996/category-transpotation_bg3kls.png",
      label: "Transportation",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036996/category-tobacco_pxuv9x.png",
      label: "Tobacco",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-livestock_t7rlpy.png",
      label: "Livestock",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-rentals_zgt6jf.png",
      label: "Real Estate",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-food_asumip.png",
      label: "Food",
    }
  ]

  const categoriesArrayHome = [
    {
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-currency_ss2avi.png",
      label: "Currency",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-services_wgiz3r.png",
      label: "Gasoline",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-metals_npidyj.png",
      label: "Metals",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036996/category-transpotation_bg3kls.png",
      label: "Transportation",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036996/category-tobacco_pxuv9x.png",
      label: "Tobacco",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-livestock_t7rlpy.png",
      label: "Livestock",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-rentals_zgt6jf.png",
      label: "Real Estate",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-food_asumip.png",
      label: "Food",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445713/category-water_wn0mcu.png",
      label: "Water",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445713/category-coffee_aump0d.png",
      label: "Coffee",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-beverages_mrwkac.png",
      label: "Beverages",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-appliances_nuomvf.png",
      label: "Appliances",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-medicine-and-health_nksi4j.png",
      label: "Medicine and Health",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-furnitures_g2le93.png",
      label: "Furnitures",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-electronic-devices_troowd.png",
      label: "Electronic Devices",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445711/category-wearable-technology_s1byzm.png",
      label: "Wearable Technology",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-clothing_tkr0na.png",
      label: "Clothing",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-agricultural-goods_xkrz59.png",
      label: "Agricultural Goods",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445712/category-energy_cwytrb.png",
      label: "Energy",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1665445711/category-services_mspwhh.png",
      label: "Services",
    }
  ]

  const handleCategoryClick = (cat:any) => {
    // if (cat==="Real Estate") dispatch(setCategory('Real_Estate'))
    // else if (cat==="Wearable Technology") dispatch(setCategory('Wearable_Technology'))
    // else if (cat==="Electronic Devices") dispatch(setCategory('Electronic_Devices'))
    // else if (cat==="Agricultural Goods") dispatch(setCategory('Agricultural_Goods'))
    // else if (cat==="Medicine and Health") dispatch(setCategory('Medicine'))
    // else dispatch(setCategory(cat))
    dispatch(setCategory(cat))
    navigate('/listing')
  }

  return (
    <CategoriesContainer>
      <CenteredTitle32>Categories</CenteredTitle32>

      {categoriesToShow === "HOME" && <LeftLinkContainer style={{padding: '2em'}}>
        <BsFillArrowLeftCircleFill size="1.5em" style={{marginRight: "1em", cursor: 'pointer', color: '#E8505B'}} onClick={() => navigate('/')}/>
        <LinkParagraph onClick={() => navigate('/')}>Back</LinkParagraph>
      </LeftLinkContainer>}

      <CategoriesRow>

          {categoriesToShow === "LANDING" && categoriesArrayLanding.map((cat) => (
            <CategoriesColumn key={cat.label}>
              <CategoryContainer onClick={() => handleCategoryClick(cat.label)}>
                <CategoryImage src={cat.link}/>
                <CategoryLabel>{cat.label}</CategoryLabel>
              </CategoryContainer>
            </CategoriesColumn>
          ))}

          {categoriesToShow === "HOME" && categoriesArrayHome.map((cat) => (
            <CategoriesColumn key={cat.label}>
              <CategoryContainer onClick={() => handleCategoryClick(cat.label)}>
                <CategoryImage src={cat.link}/>
                <CategoryLabel>{cat.label}</CategoryLabel>
              </CategoryContainer>
            </CategoriesColumn>
          ))}

      </CategoriesRow>

      {categoriesToShow === "LANDING" &&<RightLinkContainer>
        <LinkParagraph onClick={() => navigate('/categories')}>See more</LinkParagraph>
        <BsFillArrowRightCircleFill size="1.5em" style={{marginLeft: "1em", cursor: 'pointer', color: '#E8505B'}} onClick={() => navigate('/categories')}/>
      </RightLinkContainer>}
    </CategoriesContainer>
  )
}

export default Categories;
