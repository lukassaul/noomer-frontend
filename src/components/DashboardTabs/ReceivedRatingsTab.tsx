import React, { FC, Fragment, useState, useEffect, useCallback } from "react";
import Paginator from '../Paginator';
import { GetDashboardReceivedRatingsAPI } from '../../api/dashboard';
import {
  NoDataLogo,
  CenteredContainer,
  CenteredContainerDash,
  SeventyThreeThumbnail,
  PaginatorRatingContainer,
} from '../../globalStyles';

const ReceivedRatingsTab: FC<{}> = () => {

  let profileUserId = localStorage.getItem('user')
  const [receivedRatings, setReceivedRatings] = useState<any>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const handlePrevPage = (prevPage: number) => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const fetchData = useCallback(async() => {
    if(profileUserId && currentPage) {

      const ratingReceived = await GetDashboardReceivedRatingsAPI(profileUserId, 5, currentPage)
      if(ratingReceived) setIsFetching(false)
      if(ratingReceived.status === 200) {
        if(ratingReceived.hasOwnProperty('data')) {
          setReceivedRatings(ratingReceived.data.receivedRatings.results)
          setTotalPages(ratingReceived.data.receivedRatings.totalPages)
          setCurrentPage(ratingReceived.data.receivedRatings.currentPage)
        }
      }

    }
  }, [profileUserId, currentPage])

  useEffect(() => {
    fetchData()
  }, [profileUserId, fetchData]);

  useEffect(() => {
    fetchData()
  }, [currentPage, fetchData]);


  return (
    <Fragment>
      {isFetching ?
        <CenteredContainer>
          <p>Loading ....</p>
        </CenteredContainer>
        :
        <CenteredContainer style={{margin: '25px 0', flexDirection: 'column'}}>
          {receivedRatings && receivedRatings.length > 0 ?
              receivedRatings.map((rating: any) => {
                 return <CenteredContainerDash key={rating._id}>
                    <div style={{width: '25%'}}>
                      {rating.reviewerId.profile_pic && rating.reviewerId.profile_pic !== 'undefined' ?
                        <SeventyThreeThumbnail src={rating.reviewerId.profile_pic}/>
                        :
                        <SeventyThreeThumbnail src="https://res.cloudinary.com/dba8ifej6/image/upload/v1644472150/default_user_bw3qde.png"/>
                      }
                    </div>

                    <div style={{width: '75%'}}>
                      <div style={{display: 'flex', alignItems: 'baseline'}}>
                        <p style={{marginLeft: '12px'}}>{rating.rating}</p>
                      </div>
                      <p style={{fontWeight: 'bold'}}>{rating.priceId.product.category.category} : {rating.priceId.product.product_name}</p>
                      <p>{rating.priceId.classification}</p>
                      <p>{rating.priceId.price} {rating.priceId.currency} for {rating.priceId.quantity} {rating.priceId.unit}</p>
                      <p>{rating.reviewerId.first_name} {rating.reviewerId.last_name}</p>
                      <p>{rating.vote}</p>
                    </div>

                   </CenteredContainerDash>
              })

            :
            <CenteredContainer>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <p>No ratings yet</p>
                <NoDataLogo src={"https://res.cloudinary.com/dba8ifej6/image/upload/v1643595534/no_data_ohhjax.png"} />
              </div>
            </CenteredContainer>
          }

          {receivedRatings && receivedRatings.length > 0 ?
            <PaginatorRatingContainer>
              <Paginator
                totalPages={totalPages}
                currentPage={currentPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </PaginatorRatingContainer>: null
          }
        </CenteredContainer>
      }
    </Fragment>
  );
};
export default ReceivedRatingsTab;
