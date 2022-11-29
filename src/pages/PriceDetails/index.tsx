import React, {useCallback, useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";


import { RootState, AppDispatch } from '../../app/store'

import moment from 'moment'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import RatingForm from '../../components/RatingForm';
import Alert from '../../components/AlertMessage'

import {GetPriceDetailsAPI} from '../../api/priceRecord';

import Spinner from '../../components/Spinner';
import Footer from '../../components/Footer';
import {
  DetailsLabel,
  DetailsValue,
  CenteredContainer,
  CommonContainer,
  FormWraper,
  HeaderContainer,
  BodyContainer,
  LeftLinkContainer,
  LinkParagraph,
  Upvote,
  Downvote,
  FormSeparatorGray,
  FlexColumnDiv,
  FlexRowDiv,
  FlexCenterColContainer,
  FlexCenterRowContainer,
  VoteIconSmall,
  TitleThree,
  TitleThreeNoPad,
  TitleFour,
  ProductImageLarge,
  JustifyText
} from '../../globalStyles'
import {
  Container,
  FlexContainer,
  FlexBetweenRowContainer,
  FlexContainerResponsive,
  ImageDescriptionWrapper,
  ImageContainer,
  RatingText
} from './styles'

const UPVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1662087399/icon-upvote_eckbb5.png"
const DOWNVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1662087399/icon-downvote_jggvi1.png"


const sampleRatingsArray = [
  {
    id: 1,
    vote: "UPVOTE",
    reason: "The quick brown fox jumps over the lazy dog",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 2,
    vote: "UPVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 3,
    vote: "UPVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 4,
    vote: "DOWNVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 5,
    vote: "UPVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 6,
    vote: "DOWNVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 7,
    vote: "UPVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  },{
    id: 8,
    vote: "DOWNVOTE",
    reason: "",
    reviewerId: "",
    postOwnerId: "",
    priceId: "6306d38b2cb20171acb0c260",
    type: "PRICE"
  }
]

function PriceDetails() {

  const params = useParams()
  const navigate = useNavigate()

  const chartRef = useRef();
  const { errorSubmitRatingMessage, isSubmitRatingSuccess } = useSelector((state: RootState) => state.rating)
  const { isSubmitPriceRecordSuccess } = useSelector((state: RootState) => state.priceRecord)
  const [showSpinner, setShowSpinner] = useState(true)

  let isToken = localStorage.getItem('token')
  let userEmail = localStorage.getItem('userEmail')
  let user = localStorage.getItem('user')

  const [priceRecord, setPriceRecord] = useState<any>()
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [downvoteCount, setDownvoteCount] = useState(0)
  const [isOwner, setIsOwner] = useState(true)
  const [hasVoted, setHasVoted] = useState(false)

  const [priceData, setPriceData] = useState<any>();
  const [dailyAverageData, setDailyAverageData] = useState<any>();
  ChartJS.register(...registerables);


  const getPriceDetails = useCallback(async(id: string) => {
    const result: any = await GetPriceDetailsAPI(id)

    if (result && result.status === 200) {
      setPriceRecord(result.data)
      setShowSpinner(false)
      console.log("price details: ", result.data)

      /**
        Loop thru the ratings array and get the total count
        for upvote and downvote
      **/
      //let votes = result.data.ratings
      let votes = result.data.ratings
      let upCount = 0
      let downCount = 0
      await votes.map((vote:any) => {
        if(vote.vote === "UPVOTE") upCount++
        else downCount++
      })
      setUpvoteCount(upCount)
      setDownvoteCount(downCount)

      /**
        Check if the user viewing the price record is the owner
      **/
      if(user != result.data.price.uploader._id) setIsOwner(false)
      console.log("is owner: ", user != result.data.price.uploader._id)
      console.log("user: ", user)
      console.log("result.data.uploader: ", result.data.price.uploader._id)

      /**
        Check if the user viewing if already submitted a rating
      **/
      result.data.ratings.map((rating:any) => {
        if(user === rating.reviewerId._id) setHasVoted(true)
      })

      /**
        Set price data
      **/
      const avgPerLocation = result.data.avgPerLocation
      setPriceData({
        labels: avgPerLocation.map((data:any) => data._id.city),
        datasets: [
          {
            label: "Average Price per Location",
            data: avgPerLocation.map((data:any) => data.average),
            backgroundColor: [
              "#344D67",
              "#6ECCAF",
              "#ADE792",
              "#F3ECB0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      })

      /**
        Set daily average data for line chart
      **/
      const avgPerDay = result.data.avgDaily
      setDailyAverageData({
        labels: avgPerDay.map((data:any) => data._id.day),
        datasets: [
          {
            label: "Average Price per day",
            data: avgPerDay.map((data:any) => data.average),
            backgroundColor: [
              "#344D67",
              "#6ECCAF",
              "#ADE792",
              "#F3ECB0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      })

    }
  }, [])

  useEffect(() => {
    if(params.id) {
      getPriceDetails(params.id)
    };
  }, [params.id, getPriceDetails]);

  useEffect(() => {
    if(params.id) {
      getPriceDetails(params.id)
    };
  }, [isSubmitRatingSuccess]);


  const VotesDisplay = () =>
    <FlexContainer style={{fontSize: '60px', width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Upvote>{upvoteCount}</Upvote> / <Downvote>{downvoteCount}</Downvote>
    </FlexContainer>

  const ImageAndDescriptionDisplay = () =>
    <ImageDescriptionWrapper>

        <ImageContainer>
          {priceRecord && priceRecord.price.product_image && priceRecord.price.product_image !== "No image" ? <ProductImageLarge src={priceRecord.price.product_image} /> : <ProductImageLarge src="https://res.cloudinary.com/dba8ifej6/image/upload/v1665974414/no_image_1_xap5lo.png" /> }
        </ImageContainer>
        <div>
          <JustifyText>{priceRecord && priceRecord.price.description ? priceRecord.price.description : "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}</JustifyText>
        </div>

    </ImageDescriptionWrapper>

  const Details = () =>
    <FlexContainer style={{width: '100%'}}>

      <table className="table table-striped">
        <tbody>
          <tr><td width="40%"><DetailsLabel>Category: </DetailsLabel></td><td width="60%"><DetailsValue>{priceRecord.product.category.category}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Product: </DetailsLabel></td><td><DetailsValue>{priceRecord.product.product_name}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Classification: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.classification}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Uploader: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.uploader.first_name} {priceRecord.price.uploader.last_name}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Date: </DetailsLabel></td><td><DetailsValue>{moment(priceRecord.price.createdAt).format('LL')}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Location: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.location_city}, {priceRecord.price.location_state && priceRecord.price.location_state !== 'undefined' ? `${priceRecord.price.location_state}, `: null}{priceRecord.price.location_country}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Store Name: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.store}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Price: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.price} {priceRecord.price.currency} {priceRecord.price.unit ? `/ ${priceRecord.price.unit}` : null}</DetailsValue></td></tr>
        </tbody>
      </table>

    </FlexContainer>


  const ProductStats = () =>
    <FlexCenterColContainer>
      <TitleThree>Statistics for {priceRecord.product.product_name} in {priceRecord.price.location_city}, {priceRecord.price.location_state && priceRecord.price.location_state !== 'undefined' ? `${priceRecord.price.location_state}, `: null}{priceRecord.price.location_country}</TitleThree>
      <FlexBetweenRowContainer>
        <table className="table fontSize12 width40">
          <tr><td style={{fontWeight: 600}}>Highest Price:</td><td>{priceRecord.stats.highest} {priceRecord.price.currency}</td></tr>
          <tr><td style={{fontWeight: 600}}>Lowest Price:</td><td>{priceRecord.stats.lowest} {priceRecord.price.currency}</td></tr>
          <tr><td style={{fontWeight: 600}}>Mean:</td><td>{priceRecord.stats.mean}</td></tr>
          <tr><td style={{fontWeight: 600}}>Variance:</td><td>{priceRecord.stats.variance}</td></tr>
          <tr><td style={{fontWeight: 600}}>Standard Deviation:</td><td>{priceRecord.stats.standardDeviation}</td></tr>
        </table>

        <table className="table fontSize12 width40">
          <thead>
            <tr>
              <th>Price range</th>
              <th>Number of records</th>
            </tr>
          </thead>
          <tbody>
            {priceRecord.stats.priceGroup ? priceRecord.stats.priceGroup.map((group:any) => {
              return (
                <tr>
                  <td style={{textAlign: "center"}}>{group.range}</td>
                  <td style={{textAlign: "center"}}>{group.members}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </table>
      </FlexBetweenRowContainer>
    </FlexCenterColContainer>


  const DisplayRatings = () =>
    <FlexColumnDiv>
      {priceRecord.ratings.map((rating:any) => {
        return <FlexRowDiv className="ratingContentWrapper" key={rating.id} style={{alignItems: 'center'}}>
          <FlexCenterColContainer style={{justifyContent: 'center', alignItems: 'center' , width:'15%'}}>
              <VoteIconSmall src={rating.vote === "UPVOTE" ? UPVOTEURL : DOWNVOTEURL} />
              <RatingText className={rating.vote === "UPVOTE" ? "flat-green-font centerText" : "flat-red-font centerText"}>{rating.vote}</RatingText>
          </FlexCenterColContainer>
          <FlexCenterColContainer  style={{width:'85%'}}>
            <TitleThreeNoPad>{rating.reviewerId.first_name}</TitleThreeNoPad>
            <TitleFour className="flat-red-font">Reputation: {rating.reviewerId.reputation}</TitleFour>
            <p>{rating.reason}</p>
          </FlexCenterColContainer>
        </FlexRowDiv>
      })}

      {priceRecord.ratings.length === 0 ? <p>No ratings to display</p> : null }

    </FlexColumnDiv>


  const DisplayForm = () =>
    <Container>
      <FormWraper>
        {priceRecord ? <RatingForm isOwner={isOwner} hasVoted={hasVoted}/> : null}
      </FormWraper>
    </Container>



  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <Container>


              <LeftLinkContainer onClick={() => navigate('/listing')}>
                <BsFillArrowLeftCircleFill size="1.5em" style={{cursor: "pointer", marginRight: "1em", color: '#E8505B',}}/>
                <LinkParagraph >Back to list</LinkParagraph>
              </LeftLinkContainer>



              <FlexContainerResponsive style={{marginBottom: '1em'}}>
                {VotesDisplay()}
                {priceRecord ? ImageAndDescriptionDisplay() : null}
              </FlexContainerResponsive>
              {priceRecord ? Details() : null}
              {priceRecord ? ProductStats() : null}

              <FormSeparatorGray/>
              {isToken ? DisplayForm() : "Please login to vote"}
              <FormSeparatorGray/>
              {priceRecord ? DisplayRatings() : null}

              {showSpinner ? <Spinner /> : null}

          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default PriceDetails;

/**{priceData ? <div style={{ width: 700 }}><Bar ref={chartRef} data={priceData} /></div> : null}**/
// {errorSubmitRatingMessage ?
//     <Alert
//         text={errorSubmitRatingMessage}
//         bgColor="#f8d7da"
//         txtColor="#721c24"
//     /> : null
// }
//
// {isSubmitRatingSuccess ?
//     <Alert
//         text={"Rating successfully submitted."}
//         bgColor={"#d4edda"}
//         txtColor={"#155724"}
//     /> : null
// }
// {isSubmitPriceRecordSuccess ?
//     <Alert
//         text={"Price record successfully created."}
//         bgColor={"#d4edda"}
//         txtColor={"#155724"}
//     /> : null
// }
// {priceRecord ? <Line data={chartData} /> : null}
