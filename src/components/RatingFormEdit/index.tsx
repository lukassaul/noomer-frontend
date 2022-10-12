import React, { useMemo, useState, useEffect } from 'react'
import useRatingFormEdit from '../../hooks/useRatingFormEdit';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../app/store'
import { t } from '../../i18n'
import {
  LoginButtonWrapper,
  WholeWrapper,
} from './styles'
import {
  FormInput,
  FormTextArea80,
  FormError,
  TitleThreeTopPad,
  FlexContainer,
  FlexCenterColContainer,
  MainFlexContainerColumn,
  MainFlexContainerRow,
  VoteIconSmall
} from '../../globalStyles'
import Button from '../Button'

const UPVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1662087399/icon-upvote_eckbb5.png"
const DOWNVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1662087399/icon-downvote_jggvi1.png"
const DISABLEDUPVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1663743530/upvote-disabled_uphnea.png"
const DISABLEDDOWNVOTEURL = "https://res.cloudinary.com/dba8ifej6/image/upload/v1663743530/downvote-disabled_wrf0nv.png"


const RatingFormEdit = () => {
  const location = useLocation()

  //console.log("rating details: ", rating)

  const { language } = useSelector((state: RootState) => state.language)
  const { editRating } = useSelector((state: RootState) => state.rating)


  const { register, control, setValue, onSubmit, errors } = useRatingFormEdit();

  const [reason, setReason] = useState<string>('');
  const [vote, setVote] = useState<string>('');

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setReason(value)
  }

  useEffect(() => {
    console.log("edit rating: ", editRating)
    if(editRating) {
      setReason(editRating.reason)
      setVote(editRating.vote)
      setValue('reason', editRating.reason)
      setValue('rating', editRating.vote)
      setValue('reviewerId', editRating.reviewerId)
      setValue('priceID', editRating.priceId)
      setValue('ratingID', editRating._id)
    }
  }, [editRating]);

  const handleVoteSelection = (vote: string) => {
    console.log("vote: ", vote)
    setValue('rating', vote)
    setVote(vote)
  }

  return (
      <form onSubmit={onSubmit} aria-label="form">

          <TitleThreeTopPad style={{textAlign: 'center'}}>
            {vote ? <span className={vote && vote === "UPVOTE" ? "flat-green-font" : "flat-red-font"} style={{marginLeft: '1.5em'}}>{vote}</span> : null }
          </TitleThreeTopPad>
          <FlexContainer>

            <FlexCenterColContainer style={{gap: '24px', width:'20%'}}>

              <FlexCenterColContainer
                style={{justifyContent: 'center', alignItems: 'center' , cursor: 'pointer'}}
                onClick={() => handleVoteSelection("UPVOTE")}
                >
                  <p className="flat-green-font centerText">{t("Upvote_camelcase", language)}</p>
                  <VoteIconSmall src={UPVOTEURL} />
              </FlexCenterColContainer>
              <FlexCenterColContainer
                style={{justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}
                onClick={() => handleVoteSelection("DOWNVOTE")}
                >
                  <VoteIconSmall src={DOWNVOTEURL} />
                  <p className="flat-red-font centerText">{t("Downvote_camelcase", language)}</p>
              </FlexCenterColContainer>

            </FlexCenterColContainer>
            <FormTextArea80
                {...register("reason")}
                name="reason"
                className="formTextArea"
                value={reason}
                placeholder='Enter reason or comment for this post'
                aria-label='reason'
                onChange={(text) => handleReasonChange(text)}
                />
          </FlexContainer>
          <FormError>{errors.rating?.message}</FormError>
          <FormError>{errors.reason?.message}</FormError>
          <LoginButtonWrapper>
              <Button type="submit" color='gray'>{t("Submit", language)}</Button>
          </LoginButtonWrapper>


      </form>
  )
}

export default RatingFormEdit;
