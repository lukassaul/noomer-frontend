import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from 'react-top-loading-bar'
import { RootState } from "../../app/store";
import CreatePriceRecordForm from "../../components/CreatePriceRecordForm";
import { clearSubmitState } from "../../features/priceRecordSlice";

import Footer from '../../components/Footer';
import {
  CenteredContainer,
  CommonContainer,
  FormWraper
} from '../../globalStyles';
import { Container } from './styles';


function CreatePriceRecord() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isSubmitPriceRecordFetching, priceRecordID } = useSelector((state: RootState) => state.priceRecord)
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
            {isSubmitPriceRecordFetching ? <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            /> : null}


            <FormWraper>
              <CreatePriceRecordForm />
            </FormWraper>
          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default CreatePriceRecord;
