import React, {useCallback, useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from 'react-top-loading-bar'
import { RootState } from "../../app/store";
import LoginForm from "../../components/LoginForm";

import { clearLogState } from '../../features/loginSlice'
import { clearAddState } from '../../features/resetPasswordSlice'

import Alert from '../../components/AlertMessage';
import Footer from '../../components/Footer';
import {
  CenteredContainer,
  CommonContainer,
  CommonContentContainer,
  FormWraper,
} from '../../globalStyles'


function Login() {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { isLogSuccess, isLogFetching, errorLogMessage } = useSelector((state: RootState) => state.login)
  const { isChangeSuccess } = useSelector((state: RootState) => state.changePassword)
  const { isResetSuccess} = useSelector((state: RootState) => state.resetPassword)
  const showChangePasswordMessage = isChangeSuccess;
  const showForgotPasswordMessage = isResetSuccess;
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (isLogSuccess || token) {
        navigate('/dashboard')
        dispatch(clearLogState())
        dispatch(clearAddState())
    }
  }, [isLogSuccess, navigate, dispatch, token])

  useEffect(() => {
      if (isLogFetching) {
          const handle = setInterval(() => {
              setProgress(progress => progress + 10)
              if (progress > 100) { return }
          }, 100);
          return () => clearInterval(handle);
      }
      setProgress(100)
  }, [isLogFetching, progress])


  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          {isLogFetching ? <LoadingBar
              color='#f11946'
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
          /> : null}
          <CommonContentContainer>

            {showChangePasswordMessage || showForgotPasswordMessage ?
                <Alert
                  text={"Password successfully updated. Login using your new password."}
                  bgColor={"#d4edda"}
                  txtColor={"#155724"}
                /> : null
            }
            <FormWraper>
              <LoginForm />
            </FormWraper>
          </CommonContentContainer>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default Login;


// {errorLogMessage ?
//     <Alert
//         text={errorLogMessage}
//         bgColor="#f8d7da"
//         txtColor="#721c24"
//     /> : null
// }
