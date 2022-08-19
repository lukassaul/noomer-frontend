import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import { TickerContainer } from '../../globalStyles'

function TickerSlider() {

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

  return (
    <>
      <TickerContainer>
        <Marquee gradient={false}>
          {tickerArray.map((product) => (
            <p>
              <span>{product.product}</span>
              <span className="white-font">{product.price}</span>
              <span className={product.type === "RETAIL" ? "red-font" : "green-font"}>
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