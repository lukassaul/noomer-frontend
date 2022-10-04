import React, { Component, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel'


const createCarouselItemImage = (index:any = {}) => (
    <div key={index}>
        <img src={`./carousel-images/${index}.jpg`} />
    </div>
);

const baseChildren = <div>{[1, 2, 3, 4].map(createCarouselItemImage)}</div>;

export const HeaderCarousel = () => {
  class ExternalControlledCarousel extends Component<{}, { currentSlide: number; autoPlay: boolean }> {
        constructor(props:any) {
            super(props);

            this.state = {
                currentSlide: 0,
                autoPlay: true,
            };
        }

        next = () => {
            this.setState((state) => ({
                currentSlide: state.currentSlide + 1,
            }));
        };

        prev = () => {
            this.setState((state) => ({
                currentSlide: state.currentSlide - 1,
            }));
        };

        changeAutoPlay = () => {
            this.setState((state) => ({
                autoPlay: !state.autoPlay,
            }));
        };

        updateCurrentSlide = (index:any) => {
            const { currentSlide } = this.state;

            if (currentSlide !== index) {
                this.setState({
                    currentSlide: index,
                });
            }
        };

        render() {
            const buttonStyle = { fontSize: 20, padding: '5px 20px', margin: '5px 0px' };
            const containerStyle = { margin: '5px 0 20px' };
            return (
                <div>
                    <Carousel
                        autoPlay={this.state.autoPlay}
                        selectedItem={this.state.currentSlide}
                        onChange={this.updateCurrentSlide}
                        {...this.props}
                    >
                        {baseChildren.props.children}
                    </Carousel>

                </div>
            );
        }
    }

    return <ExternalControlledCarousel />;

}




// return (
//   <div className="row">
//
//     <div className="container">
//       <div className="slider">
//           <img src="./carousel-images/1.jpg" />
//           <img src="./carousel-images/2.jpg" />
//           <img src="./carousel-images/3.jpg" />
//           <img src="./carousel-images/4.jpg" />
//       </div>
//     </div>
//     <div className="handle-container">
//       <button className="handle left-handle">
//         <div className="text">&#8249;</div>
//       </button>
//       <button className="handle right-handle">
//         <div className="text">&#8250;</div>
//       </button>
//     </div>
//     <div className="header">
//       <div className="progress-bar"></div>
//     </div>
//   </div>

// <div className="handle-container">
//   <button className="handle left-handle" onClick={this.prev}>
//     <div className="text">&#8249;</div>
//   </button>
//   <button className="handle right-handle" onClick={this.next}>
//     <div className="text">&#8250;</div>
//   </button>
// </div>
// )
