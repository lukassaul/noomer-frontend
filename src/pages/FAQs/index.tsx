import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'
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


function FAQs() {
  const dispatch = useDispatch<AppDispatch>()
  const { faqs } = useSelector((state:RootState) => state.config)

  useEffect(() => {
    if (faqs[0].question === '') {
      dispatch(getFaqs('faqs'))
    }
  }, [])

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
