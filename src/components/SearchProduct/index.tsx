import React, { useState, useEffect } from 'react'
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import { setSearchProduct, getProductAutosuggest } from "../../features/searchSlice";
import {
  CenteredTitle32,
  MainFlexContainerComparison,
  MainFlexContainerRowComparison,
} from '../../globalStyles'

function SearchProduct() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { language } = useSelector((state: RootState) => state.language)

  const [searchQuery, setSearchQuery] = useState<string | null>('')


  useEffect(() => {
    dispatch(getProductAutosuggest("product"))
  },[dispatch])


  const handleSearchProduct = (e: any) => {
    e.preventDefault()
    dispatch(setSearchProduct(searchQuery))
    navigate('/listing')
  }

  return (
    <MainFlexContainerComparison className="mb3em">
      <CenteredTitle32>{t('Title_Search_Product', language)}</CenteredTitle32>
      <MainFlexContainerRowComparison>
        <div style={{width: "100%"}}>
          <div className="search_wrapper">
            <div className="search_icon"><BsSearch /></div>
            <input
              className="search_input"
              placeholder="Search for commodity"
              onChange={(event) => {
                setSearchQuery(event.currentTarget.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchProduct(e);
                }
              }}
              type="text"
            />
          </div>
        </div>
      </MainFlexContainerRowComparison>
    </MainFlexContainerComparison>
  )
}

export default SearchProduct;
