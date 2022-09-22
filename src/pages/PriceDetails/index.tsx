import React, {useCallback, useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'

import moment from 'moment'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import RatingForm from '../../components/RatingForm';
import Alert from '../../components/AlertMessage'

import {GetPriceDetailsAPI} from '../../api/priceRecord';

import Footer from '../../components/Footer';
import {
  DetailsLabel,
  DetailsValue,
  CenteredContainer,
  CommonContainer,
  Container,
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
  FlexContainer,
  FlexCenterColContainer,
  FlexCenterRowContainer,
  VoteIconSmall,
  TitleThreeNoPad,
  TitleFour,
  ProductImageLarge
} from '../../globalStyles'

const UPVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1662087399/icon-upvote_eckbb5.png"
const DOWNVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1662087399/icon-downvote_jggvi1.png"


const sampleRatingsArray = [
  {
    id: 1,
    vote: "UPVOTE",
    reason: "",
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


  const { errorSubmitRatingMessage, isSubmitRatingSuccess } = useSelector((state: RootState) => state.rating)
  const { isSubmitPriceRecordSuccess } = useSelector((state: RootState) => state.priceRecord)

  let isToken = localStorage.getItem('token')
  let userEmail = localStorage.getItem('userEmail')
  let user = localStorage.getItem('user')

  const [priceRecord, setPriceRecord] = useState<any>()
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [downvoteCount, setDownvoteCount] = useState(0)
  const [isOwner, setIsOwner] = useState(true)
  const [hasVoted, setHasVoted] = useState(false)


  const getPriceDetails = useCallback(async(id: string) => {
    const result: any = await GetPriceDetailsAPI(id)

    if (result && result.status === 200) {
      setPriceRecord(result.data)
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
    <FlexContainer style={{fontSize: '60px', width: '20%'}}>
      <Upvote>{upvoteCount}</Upvote> / <Downvote>{downvoteCount}</Downvote>
    </FlexContainer>

  const Details = () =>
    <FlexContainer style={{width: '80%', justifyContent: 'space-between'}}>
      <div style={{ padding: '1em' }}>
        <table>
          <tr><td width="40%"><DetailsLabel>Category: </DetailsLabel></td><td width="60%"><DetailsValue>{priceRecord.product.category.category}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Product: </DetailsLabel></td><td><DetailsValue>{priceRecord.product.product_name}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Classification: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.classification}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Uploader: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.uploader.first_name} {priceRecord.price.uploader.last_name}</DetailsValue></td></tr>
        </table>
      </div>

      <div style={{ padding: '1em' }}>
        <table>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Date: </DetailsLabel></td><td><DetailsValue>{moment(priceRecord.price.createdAt).format('LL')}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Location: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.location_city}, {priceRecord.price.location_state && priceRecord.price.location_state !== 'undefined' ? `${priceRecord.price.location_state}, `: null}{priceRecord.price.location_country}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Store Name: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.store}</DetailsValue></td></tr>
          <tr><td style={{marginRight:"1em"}}><DetailsLabel>Price: </DetailsLabel></td><td><DetailsValue>{priceRecord.price.price} {priceRecord.price.currency}</DetailsValue></td></tr>
        </table>
      </div>

      <div>
        {priceRecord && priceRecord.price.product_image !== "No image" ? <ProductImageLarge src={priceRecord.price.product_image} /> : <ProductImageLarge src="/No-image-available.png" /> }
      </div>
    </FlexContainer>


  const DisplayRatings = () =>
    <FlexColumnDiv>
      {priceRecord.ratings.map((rating:any) => {
        return <FlexRowDiv key={rating.id} style={{alignItems: 'center'}}>
          <FlexCenterColContainer style={{justifyContent: 'center', alignItems: 'center' , width:'15%'}}>
              <VoteIconSmall src={rating.vote === "UPVOTE" ? UPVOTEURL : DOWNVOTEURL} />
              <p className={rating.vote === "UPVOTE" ? "flat-green-font centerText" : "flat-red-font centerText"}>{rating.vote}</p>
          </FlexCenterColContainer>
          <FlexCenterColContainer  style={{width:'85%'}}>
            <TitleThreeNoPad>{rating.reviewerId.first_name}</TitleThreeNoPad>
            <TitleFour>Reputation: {rating.reviewerId.reputation}</TitleFour>
            <p>{rating.reason}</p>
          </FlexCenterColContainer>
        </FlexRowDiv>
      })}

      {priceRecord.ratings.length === 0 ? <p>No ratings to display</p> : null }

    </FlexColumnDiv>


  const DisplayForm = () =>
    <Container>
      <FormWraper>
        {errorSubmitRatingMessage ?
            <Alert
                text={errorSubmitRatingMessage}
                bgColor="#f8d7da"
                txtColor="#721c24"
            /> : null
        }

        {isSubmitRatingSuccess ?
            <Alert
                text={"Rating successfully submitted."}
                bgColor={"#d4edda"}
                txtColor={"#155724"}
            /> : null
        }
        {priceRecord ? <RatingForm isOwner={isOwner} hasVoted={hasVoted}/> : null}
      </FormWraper>
    </Container>



  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <Container>
              {isSubmitPriceRecordSuccess ?
                  <Alert
                      text={"Price record successfully created."}
                      bgColor={"#d4edda"}
                      txtColor={"#155724"}
                  /> : null
              }

              <LeftLinkContainer onClick={() => navigate(-1)}>
                <BsFillArrowLeftCircleFill size="1.5em" style={{cursor: "pointer", marginRight: "1em"}}/> <LinkParagraph >Back to list</LinkParagraph>
              </LeftLinkContainer>



              <FlexContainer>
                {VotesDisplay()}
                {priceRecord ? Details() : null}
              </FlexContainer>
              <FormSeparatorGray/>
              {isToken ? DisplayForm() : "Please login to vote"}
              <FormSeparatorGray/>
              {priceRecord ? DisplayRatings() : "why"}

          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default PriceDetails;