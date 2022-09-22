import React, {useCallback, useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import LoginForm from "../../components/LoginForm";

import { clearLogState } from '../../features/loginSlice'

import Alert from '../../components/AlertMessage';
import Footer from '../../components/Footer';
import {
  CenteredContainer,
  CommonContainer,
  CommonContentContainer,
  FormWraper
} from '../../globalStyles'


function Login() {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { isLogSuccess, isLogFetching, errorLogMessage } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (isLogSuccess || token) {
        navigate('/')
        dispatch(clearLogState())
    }
  }, [isLogSuccess, navigate, dispatch, token])


  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <CommonContentContainer>
            {errorLogMessage ?
                <Alert
                    text={errorLogMessage}
                    bgColor="#f8d7da"
                    txtColor="#721c24"
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
