import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { setCategory } from '../../features/categorySlice'
import { CategoriesContainer,
  CategoriesRow,
  CategoriesColumn,
  CategoryContainer,
  CategoryImage,
  CategoryLabel
} from './styles';
import { TitleTwo } from '../../globalStyles'

function Categories() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categoriesArray = [
    {
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-currency_ss2avi.png",
      label: "Currency",
    },{
      link: "https://res.cloudinary.com/dba8ifej6/image/upload/v1661036995/category-services_wgiz3r.png",
      label: "Services",
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

  const handleCategoryClick = (cat:any) => {
    console.log("category clock cat: ", cat)
    if (cat==="Real Estate") dispatch(setCategory('Real_Estate'))
    else dispatch(setCategory(cat))
    navigate('/listing')
  }

  return (
    <CategoriesContainer>
      <TitleTwo>Categories</TitleTwo>
      <CategoriesRow>

          {categoriesArray.map((cat) => (
            <CategoriesColumn key={cat.label}>
              <CategoryContainer onClick={() => handleCategoryClick(cat.label)}>
                <CategoryImage src={cat.link}/>
                <CategoryLabel>{cat.label}</CategoryLabel>
              </CategoryContainer>
            </CategoriesColumn>
          ))}

      </CategoriesRow>
    </CategoriesContainer>
  )
}

export default Categories;
