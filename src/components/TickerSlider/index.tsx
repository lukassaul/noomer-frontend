import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'
import { getTickers } from '../../features/configSlice'

import Marquee from "react-fast-marquee";
import { TickerContainer } from '../../globalStyles'

function TickerSlider() {

  const dispatch = useDispatch<AppDispatch>()
  const { tickers } = useSelector((state: RootState) => state.config)

  /**
    Fetching tickers to display
  **/

  useEffect(() => {
    dispatch(getTickers('tickers'));
  }, [dispatch]);
  /***/

  const tickerArray = [
    {
      product: "US-NYC BEER",
      type: "RETAIL",
      price: "$ 8.00"
    },{
      product: "US-SFO CIGAR",
      type: "RETAIL",
      price: "$ 2.49"
    },{
      product: "US-LAX VAPE",
      type: "RETAIL",
      price: "$ 24.99"
    },{
      product: "US-DZI BEER",
      type: "SERVICE",
      price: "$ 8.25"
    },{
      product: "US-PHX CIGAR",
      type: "RETAIL",
      price: "$ 3.99"
    }
  ]

  const tickerColorArray = ["#F8FD01", "#F127E9", "#F46C1F", "#EFAEEC", "#2196F3", "#B23B3B"]
  const getRandomColor = () => {
    return Math.floor(Math.random() * 5) - 1
  }

  return (
    <>
      <TickerContainer>
        <Marquee gradient={false}>
          {tickers && tickers.map((product:any) => (
            <p className="marquee-component" key={product.ticker}>
              <span style={{color: tickerColorArray[getRandomColor()]}}>{product.ticker}</span>
              <span className="white-font">{product.price} {product.currency}</span>
              <span className={product.type === "RETAIL" ? "red-font" : "green-font"} style={{fontSize: "10px"}}>
                {product.type === "RETAIL" ? "(R)" : "(S)"}
              </span>
            </p>
          ))}
          </Marquee>
      </TickerContainer>
    </>
  )
}

export default TickerSlider;
