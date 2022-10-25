import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer';
import { getFaqs } from '../../features/configSlice'
import {
  CenteredTitle32,
  CenteredContainer,
  CommonContainer,
  Container,
  TitleThree,
  JustifyText,
  MainFlexContainerComparison,
  MainFlexContainerRowComparison,
  MainFlexChildrenContainer,
  MainFlexContainerColumn50
} from '../../globalStyles'


const FAQS = [
  {
    question: "What is Noomer?",
    answer: "Noomer is a price comparison website that seeks to offer solutions for prospective buyers/ consumers around the world. Prices for basic commodities tend to vary from city to city and country to country. These price variations can be dependent on the economic status of the country PPI,inflation, average salaries, etc."
  },
  {
    question: "Why should you comparison shop with Noomer?",
    answer: "It's especially beneficial when buying expensive items, items you purchase often, or items where the product quality or price varies greatly. Through the use of advertisements, catalogs, and online searches, comparison shopping is easy and can save you money."
  },
  {
    question: "How does a price comparison site work?",
    answer: "In short, a price comparison site is a channel that collects details about a product like pricing from participating retailers. It then shares all the information on a single results page."
  },
  {
    question: "How can I search for the different commodities on Noomer?",
    answer: "Noomer compares prices of over a million products sold around the globe and can be filtered by  City, State, Region, Country or commodity wise."
  },
  {
    question: "Which categories can I search for/ are included on the Noomer website?",
    answer: "Over a dozen categories including Electronics,Real Estate, Livestock, Gasoline, Metals, Services, Food"
  },
  {
    question: "What can I purchase from Noomer",
    answer: "Noomer is a price comparison website that can help you compare prices of different commodities. To purchase any items, you have to refer to the specified/ listed stored as provided by other users."
  },
  {
    question: "How does noomer compare prices?",
    answer: "The prices that are listed on the Noomer website are up to date."
  },
  {
    question: "How can I buy from Noomer?",
    answer: "Noomer is not a direct seller of goods that are displayed on the website, instead Noomer redirects the users to the merchant's website where they can finalise the purchase."
  },
  {
    question: "Is there any service charge or fees by Noomer?",
    answer: "No, using Noomer for price comparison of different commodities is completely free of cost for the users."
  },
  {
    question: "How do I know if the user who posted the commodity prices can be trusted?",
    answer: "You can check the reviews & ratings of the user first, before taking their information into consideration."
  },
  {
    question: "How do I make payment to Noomer?",
    answer: "Noomer  does not charge or take any payments from the users."
  },
  {
    question: "Can I make savings if I use Noomer?",
    answer: "Yes definitely you can save money as you can easily calculate the difference between the lowest price and the highest price of any product."
  },
  {
    question: "Can I purchase an item in any other condition than Brand New?",
    answer: "Noomer compares prices of Brand New, Used and Refurbished condition items so you can find prices in whatever condition suits you best."
  }
]

function FAQs() {
  const dispatch = useDispatch<AppDispatch>()
  const { faqs } = useSelector((state:RootState) => state.config)

  useEffect(() => {
    if (faqs[0].question === '') {
      dispatch(getFaqs('faqs'))
    }
  }, [])

  console.log("faqs: ", faqs)
  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <MainFlexContainerComparison className="bg-beige mb3em">
            <CenteredTitle32>Frequently Asked Questions</CenteredTitle32>
            <MainFlexContainerRowComparison className="features-container">
                {faqs.length > 0 && faqs.map((item) => (
                  <MainFlexContainerColumn50 key={item.question}>
                    <MainFlexChildrenContainer>
                      <TitleThree>{item.question}</TitleThree>
                      <JustifyText>{item.answer}</JustifyText>
                    </MainFlexChildrenContainer>
                  </MainFlexContainerColumn50>
                ))}
            </MainFlexContainerRowComparison>
          </MainFlexContainerComparison>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default FAQs;
