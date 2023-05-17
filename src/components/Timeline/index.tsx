import React, { useEffect } from 'react'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import { getTimelineRecords } from "../../features/timelineSlice";
import { MainTimelineContainer,
  TimelineRow,
  TimelineColumn,
  TimelineContainer,
} from './styles';
import { TitleTwo, RightLinkContainer, LinkParagraph } from '../../globalStyles'

function Timeline() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { language } = useSelector((state: RootState) => state.language)
  const { timeline } = useSelector((state: RootState) => state.timeline)


  useEffect(() => {
    if(timeline.length === 0) {
      dispatch(getTimelineRecords("timeline"))
    }
  }, [])

  return (
    <MainTimelineContainer>
      <TitleTwo>{t('Title_Timeline', language)}</TitleTwo>
      <TimelineRow>

          {timeline.length > 0 && timeline.map((price:any) => (
            <TimelineColumn
              className="bg-darkblue white-font pointer"
              key="price._id"
              onClick={() => navigate(`/priceRecord/${price._id}`)}
            >
              <TimelineContainer>
                <span>Product: {price.product.product_name}</span>
                <span>Price: {price.price} {price.currency}</span>
                {price.store ? <span>Store / Shop: {price.store}</span> : null}
                <span>Location: {price.location_state && price.location_state !== "undefined" ? `${price.location_city}, ${price.location_state}, ${price.location_country}` : `${price.location_city}, ${price.location_country}`}</span>
              </TimelineContainer>
            </TimelineColumn>
          ))}

      </TimelineRow>
      <RightLinkContainer >
        <LinkParagraph onClick={() => navigate('/listing')}>Price Listing</LinkParagraph>
        <BsFillArrowRightCircleFill size="1.5em" style={{marginLeft: "1em", cursor: "pointer", color: '#E8505B'}} onClick={() => navigate('/listing')}/>
      </RightLinkContainer>
    </MainTimelineContainer>
  )
}

export default Timeline;
