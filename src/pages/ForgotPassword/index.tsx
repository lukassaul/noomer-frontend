import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { t } from '../../i18n'
import Footer from '../../components/Footer';
import Alert from '../../components/AlertMessage'
import ForgetPasswordForm from '../../components/ForgetPasswordForm';
import {
  CommonContainer,
  CommonContentContainer,
  CenteredContainer,
} from '../../globalStyles'


function ForgotPassword() {
    const { isRequestSuccess, errorRequestMessage} = useSelector((state: RootState) => state.resetPasswordRequest)
    const { language } = useSelector((state: RootState) => state.language)

    console.log("errorRequestMessage: ", errorRequestMessage)
    console.log("isRequestSuccess: ", isRequestSuccess)
    return (
      <>
        <CommonContainer>

          <CenteredContainer style={{flexDirection: 'column'}}>
            {errorRequestMessage ?
              <Alert
                text={errorRequestMessage}
                bgColor="#f8d7da"
                txtColor="#721c24"
                /> : null
            }
            <CommonContentContainer style={{display: 'flex', alignItems: 'center'}}>
              {isRequestSuccess ?
                <p>{t('An email has been sent to reset your password.', language)}</p>
                :
                <ForgetPasswordForm />
              }
            </CommonContentContainer>
          </CenteredContainer>

        </CommonContainer>
        <Footer />
      </>
    )
}

export default ForgotPassword
