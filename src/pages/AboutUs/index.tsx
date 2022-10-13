import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer';
import {
  CenteredTitle32,
  CenteredContainer,
  CommonContainer,
  Container,
  TitleThree,
  JustifyText,
  MainFlexContainer,
  MainFlexContainerRow,
  MainFlexChildrenContainer,
  MainFlexContainerColumn50,
  MainFlexContainerColumn75,
  MainFlexContainerColumn25
} from '../../globalStyles'

function AboutUs() {

  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <MainFlexContainer className="bg-beige mb3em">
            <CenteredTitle32>About Us</CenteredTitle32>
            <MainFlexContainerRow className="features-container">

                <MainFlexContainerColumn75>
                  <MainFlexChildrenContainer>
                    <TitleThree>What Noomer is?</TitleThree>
                    <JustifyText>Noomer is a price comparison website that seeks to offer solutions for prospective buyers/ consumers around the world. Prices for basic commodities tend to vary from City, State, Region or Country. These price variations can be dependent on the economic status of the country PPI, inflation, average salaries, etc.There is a growing demand for contracts and deals that require a unit of account and a numeraire is often used. The platform aims to maintain a set of prices on local goods which could be used as a unit of account for contracts.</JustifyText>

                    <JustifyText>Noomer is extremely useful for time poor people who know what they want or just want to get on with the purchase. It’s easy, quick, offers plenty of information, and the buying process is a smooth one too when you refer to the provided information on commodities. Noomer helps consumers realise better value when they buy a product.</JustifyText>
                  </MainFlexChildrenContainer>
                </MainFlexContainerColumn75>
                <MainFlexContainerColumn25>
                  <MainFlexChildrenContainer>
                    <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1665645076/about-us-1_k0zd8w.png" />
                  </MainFlexChildrenContainer>
                </MainFlexContainerColumn25>

                <MainFlexContainerColumn25>
                  <MainFlexChildrenContainer>
                    <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1665645076/about-us-1_k0zd8w.png" />
                  </MainFlexChildrenContainer>
                </MainFlexContainerColumn25>
                <MainFlexContainerColumn75>
                  <MainFlexChildrenContainer>
                    <TitleThree>What Noomer aims for?</TitleThree>
                    <JustifyText>Making use of the Noomer price comparison website gives you a chance to save your time and money. The main reason to use the Noomer price comparison website is to allow yourself to find the best deal by checking hundreds of price quotes from different providers in different cities or countries. Reliable data that is provided by other users who have had the first hand experience when making a transaction for the different commodities. There may be smaller or lesser-known companies that offer the service you wish to buy at a much lower price. No one ever wants to pay more than they need to. Yet, price is dynamic and regularly changes.</JustifyText>

                    <JustifyText>Noomer has revolutionised the way that consumers find the best energy providers, choose hotels, transact cryptocurrency or simply enjoy their downtime at its cheapest.</JustifyText>
                  </MainFlexChildrenContainer>
                </MainFlexContainerColumn75>


            </MainFlexContainerRow>
          </MainFlexContainer>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default AboutUs;
