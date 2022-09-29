import React, { useEffect } from 'react'

function Carousel() {

  return (
    <div className="row">

      <div className="container">
        <div className="slider">
            <img src="./carousel-images/1.jpg" />
            <img src="./carousel-images/2.jpg" />
            <img src="./carousel-images/3.jpg" />
            <img src="./carousel-images/4.jpg" />
        </div>
      </div>
      <div className="handle-container">
        <button className="handle left-handle">
          <div className="text">&#8249;</div>
        </button>
        <button className="handle right-handle">
          <div className="text">&#8250;</div>
        </button>
      </div>
      <div className="header">
        <div className="progress-bar"></div>
      </div>
    </div>
  )
}

export default Carousel
