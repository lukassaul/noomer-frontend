import React, { FC, Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Paginator from '../Paginator';
import { GetDashboardGivenRatingsAPI } from '../../api/dashboard'
import { DeleteRatingAPI } from '../../api/rating';
import { ratingEdit } from '../../features/ratingSlice';
import {
  NoDataLogo,
  CenteredContainer,
  CenteredContainerDash,
  SeventyThreeThumbnail,
  PaginatorRatingContainer,
  EditButton,
  DeleteButton
} from '../../globalStyles';
import Spinner from '../Spinner';
import ToastNotification from '../Toast';

// Import modal components
import { Modal } from '../ReusableModal/Modal';
import { ConfirmationModal } from '../ReusableModal/ConfirmationModal';
import { useModal } from '../ReusableModal/useModal';

const GivenRatingsTab: FC<{}> = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let profileUserId = localStorage.getItem('user')

  const [givenRatings, setGivenRatings] = useState<any>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedRating, setSelectedRating] = useState<string>()
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const handlePrevPage = (prevPage: number) => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const fetchData = useCallback(async() => {
    if(profileUserId && currentPage) {

      const ratingGiven = await GetDashboardGivenRatingsAPI(profileUserId, 5, currentPage)

      if (ratingGiven) setIsFetching(false)
      if(ratingGiven.status === 200) {
        if(ratingGiven.hasOwnProperty('data')) {
          setGivenRatings(ratingGiven.data.givenRatings.results)
          setTotalPages(ratingGiven.data.givenRatings.totalPages)
          setCurrentPage(ratingGiven.data.givenRatings.currentPage)
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


  const handleEdit = async (rating: object) => {

    await dispatch(ratingEdit(rating))
    navigate('/rating/edit')
  }



  // Modal functionalities
  const { isShown, toggle } = useModal();

  const onConfirm = async() => {
    toggle();

    if(selectedRating) {
      const result: any = await DeleteRatingAPI(selectedRating)

      if (result && result.status === 200) {
        ToastNotification({message: "Rating successfully deleted.", type: "SUCCESS"})
        fetchData();
      } else {
        ToastNotification({message: "Error in deleting rating. Please try again.", type: "ERROR"})
      }
    }
  };
  const onCancel = () => toggle();


  return (
    <Fragment>
      {isFetching ?
        <CenteredContainer>
          <Spinner/>
        </CenteredContainer>
        :
        <CenteredContainer style={{margin: '25px 0', flexDirection: 'column'}}>
          {givenRatings && givenRatings.length > 0 ?
            givenRatings.map((rating: any) => {
                 return (
                   <CenteredContainerDash key={rating._id}>
                      <div style={{width: '25%'}}>
                        {rating.postOwnerId.profile_pic !== 'undefined' && rating.postOwnerId.profile_pic != null ?
                          <SeventyThreeThumbnail src={rating.postOwnerId.profile_pic}/>
                          :
                          <SeventyThreeThumbnail src="https://res.cloudinary.com/dba8ifej6/image/upload/v1644472150/default_user_bw3qde.png"/>
                        }
                      </div>

                      <div style={{width: '75%'}}>
                        <div style={{display: 'flex', alignItems: 'baseline'}}>
                          <p style={{marginLeft: '12px'}}>{rating.rating}</p>
                        </div>
                        {rating && rating.priceId && rating.priceId.hasOwnProperty('product') ?
                          <>
                            <p style={{fontWeight: 'bold'}}>{rating.priceId.product.category.category} : {rating.priceId.product.product_name}</p>
                            <p>{rating.priceId.classification ? rating.priceId.classification : null}</p>
                            <p>{rating.priceId.price} {rating.priceId.currency} for {rating.priceId.quantity} {rating.priceId.unit}</p>
                          </>
                          :
                          <p>Price record has been deleted</p>
                        }

                        <p>{rating.postOwnerId.first_name} {rating.postOwnerId.last_name}</p>
                        <p>{rating.vote}</p>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '12px'}}>
                          <EditButton onClick={() => handleEdit(rating)}>Edit</EditButton>
                          <DeleteButton onClick={() => {toggle(); setSelectedRating(rating._id)}} style={{paddingLeft: '12px'}}>Delete</DeleteButton>
                        </div>
                      </div>

                   </CenteredContainerDash>
              )})
            :
            <CenteredContainer>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <p>No ratings yet</p>
                <NoDataLogo src={"https://res.cloudinary.com/dba8ifej6/image/upload/v1643595534/no_data_ohhjax.png"} />
              </div>
            </CenteredContainer>
          }

          {givenRatings && givenRatings.length > 0 ?
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

      <Modal
        isShown={isShown}
        hide={toggle}
        headerText="Delete rating"
        modalContent={
          <ConfirmationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            message="Are you sure you want to delete rating?"
          />
        }
      />
    </Fragment>
  );
};

export default GivenRatingsTab;
