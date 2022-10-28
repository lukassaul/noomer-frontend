import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer';
import {
  CenteredTitle24,
  CenteredTitle32,
  CenteredContainer,
  CommonContainer,
  Container,
  TitleThree,
  JustifyText,
  FlexCenterContainer,
  MainFlexContainerComparison,
  MainFlexContainerRowComparison,
  MainFlexContainerColumn50,
} from '../../globalStyles'
import {
  AboutContentContainer,
  MainFlexChildrenContainer,
  MainFlexChildrenContainerRight,
  MainFlexChildrenContainerLeft,
  MainFlexContainerColumn75Right,
  MainFlexContainerColumn75Left,
  MainFlexContainerColumn25,
  SecondImageMobile,
  SecondImageDesktop
} from './styles'

function AboutUs() {

  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <MainFlexContainerComparison className="bg-midgray mb3em">

            <MainFlexContainerRowComparison className="features-container">
                <MainFlexContainerColumn75Right>
                  <MainFlexChildrenContainer>
                    <TitleThree>What Noomer is?</TitleThree>
                    <JustifyText>Noomer is a price comparison website that seeks to offer solutions for prospective buyers/ consumers around the world. Prices for basic commodities tend to vary from City, State, Region or Country. These price variations can be dependent on the economic status of the country PPI, inflation, average salaries, etc.There is a growing demand for contracts and deals that require a unit of account and a numeraire is often used. The platform aims to maintain a set of prices on local goods which could be used as a unit of account for contracts.</JustifyText>

                    <JustifyText>Noomer is extremely useful for time poor people who know what they want or just want to get on with the purchase. It’s easy, quick, offers plenty of information, and the buying process is a smooth one too when you refer to the provided information on commodities. Noomer helps consumers realise better value when they buy a product.</JustifyText>
                  </MainFlexChildrenContainer>
                </MainFlexContainerColumn75Right>
                <MainFlexContainerColumn25>
                  <MainFlexChildrenContainerRight>
                    <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1666921297/about-us-value-price_n3fu8s.png" />
                  </MainFlexChildrenContainerRight>
                </MainFlexContainerColumn25>

                <SecondImageDesktop>
                  <MainFlexContainerColumn25>
                    <MainFlexChildrenContainerLeft>
                      <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1665645076/about-us-1_k0zd8w.png" />
                    </MainFlexChildrenContainerLeft>
                  </MainFlexContainerColumn25>
                  <MainFlexContainerColumn75Left>
                    <MainFlexChildrenContainer>
                      <TitleThree>What Noomer aims for?</TitleThree>
                      <JustifyText>Making use of the Noomer price comparison website gives you a chance to save your time and money. The main reason to use the Noomer price comparison website is to allow yourself to find the best deal by checking hundreds of price quotes from different providers in different cities or countries. Reliable data that is provided by other users who have had the first hand experience when making a transaction for the different commodities. There may be smaller or lesser-known companies that offer the service you wish to buy at a much lower price. No one ever wants to pay more than they need to. Yet, price is dynamic and regularly changes.</JustifyText>

                      <JustifyText>Noomer has revolutionised the way that consumers find the best energy providers, choose hotels, transact cryptocurrency or simply enjoy their downtime at its cheapest.</JustifyText>
                    </MainFlexChildrenContainer>
                  </MainFlexContainerColumn75Left>
                </SecondImageDesktop>

                <SecondImageMobile>
                  <MainFlexContainerColumn75Right>
                    <MainFlexChildrenContainer>
                      <TitleThree>What Noomer aims for?</TitleThree>
                      <JustifyText>Making use of the Noomer price comparison website gives you a chance to save your time and money. The main reason to use the Noomer price comparison website is to allow yourself to find the best deal by checking hundreds of price quotes from different providers in different cities or countries. Reliable data that is provided by other users who have had the first hand experience when making a transaction for the different commodities. There may be smaller or lesser-known companies that offer the service you wish to buy at a much lower price. No one ever wants to pay more than they need to. Yet, price is dynamic and regularly changes.</JustifyText>

                      <JustifyText>Noomer has revolutionised the way that consumers find the best energy providers, choose hotels, transact cryptocurrency or simply enjoy their downtime at its cheapest.</JustifyText>
                    </MainFlexChildrenContainer>
                  </MainFlexContainerColumn75Right>
                  <MainFlexContainerColumn25>
                    <MainFlexChildrenContainerRight>
                      <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1665645076/about-us-1_k0zd8w.png" />
                    </MainFlexChildrenContainerRight>
                  </MainFlexContainerColumn25>
                </SecondImageMobile>
            </MainFlexContainerRowComparison>

            <div className="bg-beige">
              <CenteredTitle24>Powered by</CenteredTitle24>
              <CenteredTitle32>Vermont Secure Computing Consultancy</CenteredTitle32>
              <FlexCenterContainer>
                <AboutContentContainer>
                  <FlexCenterContainer>
                    <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1666921297/vermont-logo_bujth4.png" width="128px" height="auto"/>
                  </FlexCenterContainer>
                  <div style={{padding: '2em'}}>
                    <JustifyText>VTSCC is a computing services and technology consultancy and incubator.</JustifyText>

                    <JustifyText>We are building software and hardware, as well as consulting in computing systems and public coin technologies. The website is maintained by the research division.</JustifyText>
                  </div>
                </AboutContentContainer>
              </FlexCenterContainer>
            </div>

            </MainFlexContainerComparison>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default AboutUs;
