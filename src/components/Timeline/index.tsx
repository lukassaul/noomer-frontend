import React, { useState, useEffect } from 'react'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import { MainTimelineContainer,
  TimelineRow,
  TimelineColumn,
  TimelineContainer,
  TimelineImage,
  TimelineLabel,
  TimelineLinkContainer,
  PriceListingLink
} from './styles';
import { TitleTwo } from '../../globalStyles'

function Timeline() {

  const { language } = useSelector((state: RootState) => state.language)

  const timelineArray = [
    {
      product: {
        category: {
          category: "Food",
          uploader: "0123456789",
        },
        product_name: "Rice",
        uploader: "0123456789",
      },
      classification: "Jasmin Long grain",
      quantity: 1,
      unit: "Kilogram",
      price: 25,
      currency: "USD",
      type: "RETAIL",
      ticker: "US-OXN RICE RETAIL",
      store: "Walmart Supercenter",
      location_city: "Oxnard",
      location_state: "California",
      location_country: "United States",
      description: null,
      uploader: {
        first_name: "John",
        last_name: "Doe",
        location_city: "Oxnard",
        location_state: "California",
        location_country: "United States",
      }
    },{
      product: {
        category: {
          category: "Rentals",
          uploader: "0123456789",
        },
        product_name: "Apartment",
        uploader: "0123456789",
      },
      classification: "One bedroom Apartment",
      quantity: 1,
      unit: "unit",
      price: 400,
      currency: "USD",
      type: "RETAIL",
      ticker: "US-NYC APARTMENT RETAIL",
      store: null,
      location_city: "New York City",
      location_state: "New York",
      location_country: "United States",
      description: "",
      uploader: {
        first_name: "Elon",
        last_name: "Musk",
        location_city: "New York City",
        location_state: "New York",
        location_country: "United States",
      }
    },{
      product: {
        category: {
          category: "Food",
          uploader: "0123456789",
        },
        product_name: "Lunch Meal",
        uploader: "0123456789",
      },
      classification: "Rice, Fried Chicken and egg",
      quantity: 1,
      unit: "unit",
      price: 3.98,
      currency: "USD",
      type: "RETAIL",
      ticker: "US-LAX LUNCH MEAL RETAIL",
      store: null,
      location_city: "Los Angeles",
      location_state: "California",
      location_country: "United States",
      description: "",
      uploader: {
        first_name: "Lebron",
        last_name: "James",
        location_city: "Los Angeles",
        location_state: "California",
        location_country: "United States",
      }
    }
  ]

  return (
    <MainTimelineContainer>
      <TitleTwo>{t('Title_Timeline', language)}</TitleTwo>
      <TimelineRow>

          {timelineArray.map((price) => (
            <TimelineColumn className="bg-beige">
              <TimelineContainer>
                <span>Product: {price.product.product_name}</span>
                <span>Price: {price.price} {price.currency}</span>
                {price.store ? <span>Store / Shop: {price.store}</span> : null}
                <span>Location: {price.location_state ? `${price.location_city}, ${price.location_state}, ${price.location_country}` : `${price.location_city}, ${price.location_country}`}</span>
              </TimelineContainer>
            </TimelineColumn>
          ))}

      </TimelineRow>
      <TimelineLinkContainer>
        <PriceListingLink>Price Listing</PriceListingLink> <BsFillArrowRightCircleFill size="1.5em" style={{marginLeft: "1em"}}/>
      </TimelineLinkContainer>
    </MainTimelineContainer>
  )
}

export default Timeline;
