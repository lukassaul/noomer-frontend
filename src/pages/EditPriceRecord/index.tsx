import React, {useCallback, useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from 'react-top-loading-bar'
import Alert from '../../components/AlertMessage';
import { RootState } from "../../app/store";
import EditPriceRecordForm from "../../components/EditPriceRecordForm";
import { clearSubmitState } from "../../features/priceRecordSlice";

import Footer from '../../components/Footer';
import {
  CenteredContainer,
  CommonContainer,
  CommonContentContainer,
  FormWraper
} from '../../globalStyles';
import { Container } from './styles';


function EditPriceRecord() {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { isEditPriceRecordFetching, priceRecordID, errorEditPriceRecordMessage } = useSelector((state: RootState) => state.priceRecord)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (priceRecordID) {
      navigate(`/priceRecord/${priceRecordID}`, { replace: true })
      dispatch(clearSubmitState())
    }
  }, [priceRecordID, navigate])


  return (
    <>
      <CommonContainer style={{backgroundColor: '#F7F7F7'}}>
        <CenteredContainer>
          <Container>
            {isEditPriceRecordFetching ? <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            /> : null}


            <FormWraper>
              <EditPriceRecordForm />
            </FormWraper>
          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default EditPriceRecord;

// {errorEditPriceRecordMessage ?
//     <Alert
//         text={errorEditPriceRecordMessage}
//         bgColor="#f8d7da"
//         txtColor="#721c24"
//     /> : null
// }
