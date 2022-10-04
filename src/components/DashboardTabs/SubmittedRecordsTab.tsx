import React, { FC, Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import Paginator from '../Paginator';
import { GetDashboardSubmittedRecordsAPI } from '../../api/dashboard';
//import { DeletePostAPI } from '../../api/post';
//import { addSingleItem } from '../../features/postServiceSlice';
import {
  CreatedPostContainer,
  TableHeaderContainer
} from './styles'
import {
  NoDataLogo,
  CenteredContainer,
  PaginatorContainer,
  EditButton,
  DeleteButton,
} from '../../globalStyles';

// Import modal components
import { Modal } from '../ReusableModal/Modal';
import { ConfirmationModal } from '../ReusableModal/ConfirmationModal';
import { useModal } from '../ReusableModal/useModal';

let moment = require('moment');

const SubmittedRecordsTab: FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { language } = useSelector((state: RootState) => state.language)
  let profileUserId = localStorage.getItem('user')
  const [createdPosts, setCreatedPosts] = useState<any>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [selectedPost, setSelectedPost] = useState<string>()

  const handlePrevPage = (prevPage: number) => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  // const fetchData = async () => {
  //   if(profileUserId && currentPage) {
  //     const postCreated = await GetDashboardCreatedPostsAPI(profileUserId, 5, currentPage)
  //     if (postCreated) setIsFetching(false)
  //     if(postCreated.status === 200) {
  //       if(postCreated.hasOwnProperty('data')) {
  //         setCreatedPosts(postCreated.data.createdPosts.results)
  //         setTotalPages(postCreated.data.createdPosts.totalPages)
  //         setCurrentPage(postCreated.data.createdPosts.currentPage)
  //       }
  //     }
  //   }
  // }

  const fetchData = useCallback(async() => {
    if(profileUserId && currentPage) {
      const postCreated = await GetDashboardSubmittedRecordsAPI(profileUserId, 5, currentPage)
      console.log("post created: ", postCreated)
      if (postCreated) setIsFetching(false)
      if(postCreated.status === 200) {
        if(postCreated.hasOwnProperty('data')) {
          setCreatedPosts(postCreated.data.submittedRecords.results)
          setTotalPages(postCreated.data.submittedRecords.totalPages)
          setCurrentPage(postCreated.data.submittedRecords.currentPage)
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

  const editPost = async(item: object) => {
    console.log("edit post")
    // dispatch(addSingleItem(item))
    // navigate('/edit/post')
  }


  // Modal functionalities
  const { isShown, toggle } = useModal();

  const onConfirm = async() => {
    toggle();
    if(selectedPost) {
      console.log("onConfirm function")
      // const result: any = await DeletePostAPI(selectedPost)
      // if (result && result.status === 200) {
      //   fetchData();
      // }
    }
  };
  const onCancel = () => toggle();


  return (
    <Fragment>
      <div style={{margin: '25px 0'}}>
        {isFetching ?
          <CenteredContainer>
            <p>Loading ....</p>
          </CenteredContainer>
          :
          <div>
            <TableHeaderContainer style={{display: 'none'}}>
               <div style={{width: '20%', fontWeight: 'bold', textAlign: 'center'}}>{t("TITLE",language)}</div>
               <div style={{width: '40%', fontWeight: 'bold', textAlign: 'center'}}>{t("DESCRIPTION",language)}</div>
               <div style={{width: '20%', fontWeight: 'bold', textAlign: 'center'}}>{t("EXPIRATION",language)}</div>
               <div style={{width: '20%', fontWeight: 'bold', textAlign: 'center'}}>{t("STATUS",language)}</div>
             </TableHeaderContainer>
            {createdPosts && createdPosts.length > 0 ?
              createdPosts.map((price: any) => {
                   return <CenteredContainer key={price._id}>
                    <CreatedPostContainer>
                        <div style={{display: 'flex', justifyContent:'flex-end', flexDirection: 'row', alignItems: 'center', marginBottom: '12px'}}>
                           <EditButton onClick={() => editPost(price)}>Edit</EditButton>
                           <DeleteButton onClick={() => {toggle(); setSelectedPost(price._id)}} style={{paddingLeft: '12px'}}>Delete</DeleteButton>
                        </div>
                        <div style={{fontWeight: 'bold', marginBottom: '1em'}}>{price.product ? `${price.product.category.category.toUpperCase()} : ${price.product.product_name}` : null}</div>

                        {price.classification ? <div style={{color: '#747474'}}>{price.classification.length > 100 ? price.classification.substring(0, 120) + ' ...': price.classification}</div> : null}

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '12px'}}>
                          <div style={{marginRight: '1em'}}><span style={{color: '#747474'}}>{t("Date",language)}:</span> {price.updatedAt ? moment(price.updatedAt).format('MMMM DD, YYYY') : null}</div>
                          <div><span style={{color: '#747474'}}>{t("Status",language)}:</span> {price.expired ? "Expired" : "Active"}</div>
                        </div>
                      </CreatedPostContainer>
                    </CenteredContainer>

              })
              :
              <CenteredContainer>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <p>{t("No post created yet", language)}</p>
                  <NoDataLogo src={"https://res.cloudinary.com/dba8ifej6/image/upload/v1643595534/no_data_ohhjax.png"} />
                </div>
              </CenteredContainer>
            }
          </div>
          }

          {createdPosts && createdPosts.length > 0 ?
            <PaginatorContainer>
              <Paginator
                totalPages={totalPages}
                currentPage={currentPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </PaginatorContainer>: null
          }
      </div>

      <Modal
        isShown={isShown}
        hide={toggle}
        headerText="Delete post"
        modalContent={
          <ConfirmationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            message="Are you sure you want to delete this post?"
          />
        }
      />
    </Fragment>
  );
};
export default SubmittedRecordsTab;