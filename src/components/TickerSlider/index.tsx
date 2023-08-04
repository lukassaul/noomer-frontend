import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { RootState, AppDispatch } from '../../app/store'
import { getTickers } from '../../features/configSlice'
import { setTicker } from '../../features/tickerSlice'
import { clearSearchProduct } from '../../features/searchSlice'
import { clearCategory } from '../../features/categorySlice'

import Marquee from "react-fast-marquee";
import { TickerContainer } from '../../globalStyles'

function TickerSlider() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { tickers } = useSelector((state: RootState) => state.config)

  const location = useLocation()
  const currpath = location.pathname

  /**
    Fetching tickers to display
  **/

  useEffect(() => {
    dispatch(getTickers('tickers'));
  }, [dispatch]);
  /***/


  const tickerColorArray = ["#F8FD01", "#00E0FF", "#F127E9", "#FF0000", "#5DD662", "#FFFFFF"]
  const getRandomColor = () => {
    return Math.floor(Math.random() * 5)
  }

  const handleTickerClick = (ticker:string) => {
    dispatch(setTicker(ticker))
    dispatch(clearSearchProduct())
    dispatch(clearCategory())
    navigate('/listing')
  }

  return (
    <>
      {currpath === "/" ?
        <TickerContainer>
          <Marquee gradient={false} style={{backgroundColor: 'black'}}>
            {tickers && tickers.map((product:any) => (
              <p className="marquee-component" key={product.ticker} style={{cursor: 'pointer'}} onClick={() => handleTickerClick(product.ticker)}>
                <span style={{color: tickerColorArray[getRandomColor()]}}>{product.ticker}</span>
                <span className="white-font">{product.price} {product.currency}</span>
                <span className={product.type === "RETAIL" ? "red-font" : "green-font"} style={{fontSize: "14px"}}>
                  {product.type === "RETAIL" ? "(R)" : "(S)"}
                </span>
              </p>
            ))}
            </Marquee>
        </TickerContainer>
        : null
      }
    </>
  )
}

export default TickerSlider;
