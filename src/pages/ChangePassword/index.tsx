import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../app/store';
import { t } from '../../i18n';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import Button from '../../components/Button';
import Footer from '../../components/Footer'
import Alert from '../../components/AlertMessage'
import { clearLogState } from '../../features/loginSlice'
import { clearAddState } from '../../features/addPasswordSlice'
import { clearRegState } from '../../features/registrationSlice'
import {
    PasswordResetSection,
    PasswordTitle,
} from './styles'

import {
  Container,
  CommonContainer,
  CenteredContainer,
  CenteredTitle32
} from '../../globalStyles'

function ChangePassword() {
    let navigate = useNavigate();
    const { isChangeSuccess, errorChangeMessage } = useSelector((state: RootState) => state.changePassword)
    const { language } = useSelector((state: RootState) => state.language)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isChangeSuccess) {

            dispatch(clearRegState())
            dispatch(clearLogState())
            dispatch(clearAddState())
            localStorage.clear()
            navigate('/login');
        }
    }, [isChangeSuccess, navigate, dispatch])

    return (
      <>
        <CommonContainer style={{padding: '2em'}}>
          <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
          <CenteredContainer style={{ flexDirection: 'column' }}>
            {errorChangeMessage ?
                <Alert
                    text={errorChangeMessage}
                    bgColor="#f8d7da"
                    txtColor="#721c24"
                /> : null
            }
            <PasswordResetSection>
                <Container>
                  <CenteredTitle32>{t('Please enter your new password', language)}</CenteredTitle32>
                  <ChangePasswordForm />
                </Container>
            </PasswordResetSection>
          </CenteredContainer>
        </CommonContainer>
        <Footer />
      </>
    )
}

export default ChangePassword
