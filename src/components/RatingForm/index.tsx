import React, { useMemo, useState, useEffect } from 'react'
import useRatingForm from '../../hooks/useRatingForm';
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
  TitleTwo,
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

type Props = {
  isOwner: boolean;
  hasVoted: boolean;
};

//function RatingForm(isOwner: boolean) {
const RatingForm: React.FC<Props> = ({
    isOwner,
    hasVoted
  }) => {
  const location = useLocation()
  let pathname = location.pathname
  const path = pathname.split('/')
  const recordType = path[1]
  const recordId = path[2]

  console.log("Rating form isOwner: ", isOwner)
  console.log("path: ", path)
  console.log("recordType: ", recordType)
  console.log("recordId: ", recordId)

  const { language } = useSelector((state: RootState) => state.language)
  const { isSubmitRatingFetching } = useSelector((state: RootState) => state.rating)

  const { register, control, setValue, onSubmit, errors } = useRatingForm();

  const profileId = localStorage.getItem('user')
  const [reason, setReason] = useState<string>('');
  const [vote, setVote] = useState<string>('');

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setReason(value)
  }

  useEffect(() => {
    if (profileId) setValue('reviewerId', profileId)
    if (recordType && recordType === "priceRecord") setValue('type', "PRICE")
    if (recordType && recordType === "tradeRecord") setValue('type', "TRADE")
    if (recordId) setValue('priceID', recordId)
  }, [profileId, recordType, recordId]);

  const handleVoteSelection = (vote: string) => {
    console.log("vote: ", vote)
    if (!hasVoted) {
      setValue('rating', vote)
      setVote(vote)
    }
  }

  return (
      <form onSubmit={onSubmit} aria-label="form">

              <TitleTwo>
                {isOwner ? t("You are not allowed to rate your own post.", language)
                  :
                  hasVoted ?
                  t("You have already submitted your rating for this record.", language)
                  :
                  t("How would you rate this post?", language)
                }
                {vote ? <span className={vote && vote === "UPVOTE" ? "flat-green-font" : "flat-red-font"} style={{marginLeft: '0.5em'}}>{vote}</span> : null }
              </TitleTwo>
              <FlexContainer>

                <FlexCenterColContainer style={{gap: '24px', width:'20%'}}>

                  <FlexCenterColContainer
                    style={{justifyContent: 'center', alignItems: 'center' , cursor: 'pointer'}}
                    onClick={() => handleVoteSelection("UPVOTE")}
                    >
                      <p className={hasVoted || isOwner ? "disabled-font" : "flat-green-font centerText"}>{t("Upvote_camelcase", language)}</p>
                      <VoteIconSmall src={isOwner || hasVoted ? DISABLEDUPVOTEURL : UPVOTEURL} />
                  </FlexCenterColContainer>
                  <FlexCenterColContainer
                    style={{justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}
                    onClick={() => handleVoteSelection("DOWNVOTE")}
                    >
                      <VoteIconSmall src={isOwner || hasVoted ? DISABLEDDOWNVOTEURL : DOWNVOTEURL} />
                      <p className={isOwner || hasVoted ? "disabled-font" : "flat-red-font centerText"}>{t("Downvote_camelcase", language)}</p>
                  </FlexCenterColContainer>

                </FlexCenterColContainer>
                <FormTextArea80
                    {...register("reason")}
                    name="reason"
                    className="formTextArea"
                    placeholder='Enter reason or comment for this post'
                    aria-label='reason'
                    onChange={(text) => handleReasonChange(text)}
                    disabled={hasVoted || isOwner ? true : false}
                    />
              </FlexContainer>
              <FormError>{errors.rating?.message}</FormError>
              <FormError>{errors.reason?.message}</FormError>
              <LoginButtonWrapper>
                  <Button type="submit" color='gray' disabled={isOwner || hasVoted || isSubmitRatingFetching ? true : false}>{t("Submit", language)}</Button>
              </LoginButtonWrapper>


      </form>
  )
}

export default RatingForm;
