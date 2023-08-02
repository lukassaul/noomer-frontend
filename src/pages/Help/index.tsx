import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaFileExport, FaEdit } from "react-icons/fa"
import { RootState } from '../../app/store'
import { t } from '../../i18n'
import Footer from '../../components/Footer';
import {
  CenteredContainer,
  FlexCenterRow,
  FlexCenterRowContainer, 
  HalfDiv, 
  HalfDivDarkGray, 
  HalfDivLightGray, 
  JustifyText
} from './styles'
import {
  Title32,
  CommonContainerWhite,
  CenteredTitle24,
} from '../../globalStyles'
import { IconContext } from 'react-icons'
import { Create } from '@mui/icons-material'


const ACCOUNT_SETUP = [
  {
    text: '1. Click the Sign up button',
    imageSrc: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1690961739/account_step_1_lq9od0.png'
  },
  {
    text: '2. Register your E-mail',
    imageSrc: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1690961738/account_step_2_ltygdf.png'
  },
  {
    text: '3. Go to your E-mail to verify your Noomer account',
    imageSrc: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1690961738/account_step_3_h4h5up.png'
  },
  {
    text: '4. Add your Password and then click Submit button',
    imageSrc: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1690961739/account_step_4_vxuzsr.png'
  }
]

const SUBMIT_PRICE_STEP = [
  {
    title: "Selecting a product or service",
    contents : [
      "In this first step, we'd like you to select the product or service from the dropdown menu below for which you wish to add a price record.",
      "Once you've made your selection, we'll proceed thru the process of recording the price for the chosen product or service. Let's begin and ensure accurate and up-to-date pricing information for your chosen item."
    ],
    imageSrc: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1690962658/submit_price_step_1_sp2tn6.png'
  },
  {
    title: "Submitting price record",
    contents : [
      "Here, we'll gather all the essential details to create a comprehensive price record for your chosen product or service.",
      "Fill up all the required fields such as Price, Currency, Product or Service Name, Location, etc. Optionally, you can upload an image of the product or service, or a receipt, to further validate the price record. This step helps ensure accuracy and credibility.",
      "Once you've filled out all the necessary details, hit the submit button, and you're all set! Thank you for contributing to our community and helping others make informed decisions with up-to-date pricing information. If you have more price records to add, simply repeat the process for each item. Let's collaborate and make Noomer a leading site for price information!"
    ],
    imageSrc: 'https://res.cloudinary.com/dba8ifej6/image/upload/v1690962658/submit_price_step_2_fqyjr5.png'
  },
]

function Help() {
  const { language } = useSelector((state: RootState) => state.language)
  const [topic, setTopic] = useState('Account')


  const Header = () => 
    <FlexCenterRowContainer>
      <HalfDiv>
          <Title32>{t('Help page', language)}</Title32>
          <JustifyText>The help page seeks to provide instructional information on how the Noomer price comparison website works. The provided data on this page help the users familiarise themselves with the different functions and how to use the site. This page will help you navigate your way through the website easily. </JustifyText>
      </HalfDiv>
      <div>
        <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1690955944/help_page_vtdasq.png" width="100%" height="auto" alt="help page" />
      </div>
    </FlexCenterRowContainer>

  const SelectTopic = () => 
    <FlexCenterRow style={{marginBottom: '2em'}}>
      <HalfDivLightGray onClick={() => setTopic('Account')}>
        <IconContext.Provider value={{ size: "1.5em", className: "react-icon" }}>
          <div>
            <FaEdit />
          </div>
          <p>How do i create an account on Noomer?</p>
        </IconContext.Provider>
      </HalfDivLightGray>
      <HalfDivDarkGray onClick={() => setTopic('SubmitPrice')}>
        <IconContext.Provider value={{ size: "1.5em", color: "red", className: "react-icon" }}>
            <div>
              <FaFileExport />
            </div>
            <p>Submitting a Price Record</p>
        </IconContext.Provider>
      </HalfDivDarkGray>
    </FlexCenterRow>


  const Steps = (step:any) =>
    <CenteredContainer style={{marginBottom: '4em'}}>
      <p style={{marginBottom: '1em', textAlign: 'center'}}>{step.text}</p>
      {step.imageSrc ? <img src={step.imageSrc} alt={step.text} width='100%' height='auto' /> : null}
    </CenteredContainer>

const StepsNested = (step:any) => {
    const contents = step.contents
    console.log("image source: ", step.image)
    return <CenteredContainer style={{marginBottom: '4em'}}>
      <p style={{marginBottom: '1em', textAlign: 'center', fontWeight: 'bold'}}>{step.title}</p>
      {contents.map((content: string) => (
        <p style={{marginBottom: '1em', textAlign: 'justify'}}>{content}</p>
      ))}
      {step.imageSrc ? <img src={step.imageSrc} alt={step.title} className='steps-nested-image'/> : null}
    </CenteredContainer>
  }

  const CreateAccount = () => 
    <CenteredContainer>
      <CenteredTitle24>How do i create an account on Noomer?</CenteredTitle24>
      
      {ACCOUNT_SETUP.map((step) => (
        Steps(step)
      ))}
    </CenteredContainer>

const SubmitPriceRecord = () => 
    <CenteredContainer>
      <CenteredTitle24>Submitting Price Record</CenteredTitle24>
      <HalfDiv>
        {SUBMIT_PRICE_STEP.map((step) => (
          StepsNested(step)
        ))}
      </HalfDiv>
    </CenteredContainer>

  return (
    <>
      <CommonContainerWhite>
        <CenteredContainer>
            {Header()}
            {SelectTopic()}
            {topic === 'Account' ? CreateAccount() : null}
            {topic === 'SubmitPrice' ? SubmitPriceRecord() : null}
        </CenteredContainer>
      </CommonContainerWhite>
      <Footer />
    </>
  )

}

export default Help;
