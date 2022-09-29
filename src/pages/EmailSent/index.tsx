import React, { useState } from 'react'
import { emailResendAPI } from '../../api/auth'
import { useSelector } from 'react-redux'
import { t } from '../../i18n'
import { RootState } from "../../app/store"
import Alert from '../../components/AlertMessage'
import { Container } from '../../globalStyles';
import {
    EmailSentContainer,
    EmailSentWrapper,
    EmailSentInner,
    EmailSentCheck,
    EmailSentImg,
    EmailSentDidWrapper,
    EmailSentDid,
    EmailSentClick,
    EmailSentTitle
} from './styles'

function EmailSent() {
    const { language } = useSelector((state: RootState) => state.language)
    const [resendEmailMessage, setResendEmailMessage] = useState<string | null>(null)
    const [resendStatus, setResendStatus] = useState<string | null>(null)
    const handleEmailResend = async (e: any) => {
        e.preventDefault();
        let resend = await emailResendAPI()
        if (resend.status === 201) {
          setResendEmailMessage("Email verification successfully sent")
          setResendStatus("SUCCESS")
        } else {
          setResendEmailMessage("Email verification sending failed. Please try again.")
          setResendStatus("FAILED")
        }
    }

    return (
        <Container>
          {resendEmailMessage ?
            <Alert
              text={resendEmailMessage}
              bgColor={resendStatus === "SUCCESS" ? "#d4edda" : "#f8d7da" }
              txtColor={resendStatus === "SUCCESS" ? "#155724" : "#721c24"}
            /> : null
          }
            <EmailSentWrapper>
                <EmailSentContainer>
                    <EmailSentInner>
                        <EmailSentTitle>{t('Verify your email', language)}</EmailSentTitle>
                        <EmailSentCheck>{t('Check your email and click the link to activate your account', language)}</EmailSentCheck>
                        <EmailSentImg src={"https://res.cloudinary.com/dba8ifej6/image/upload/v1643595533/mail_xhlpfp.png"} />
                        <EmailSentDidWrapper>
                            <EmailSentDid>{t("Didn't get the email?", language)}</EmailSentDid>
                            <EmailSentClick onClick={(e) => handleEmailResend(e)}> {t('Resend', language)}</EmailSentClick>
                        </EmailSentDidWrapper>
                    </EmailSentInner>
                </EmailSentContainer>
            </EmailSentWrapper>
        </Container>
    )
}

export default EmailSent
