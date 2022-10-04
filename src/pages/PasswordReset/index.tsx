import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../app/store';
import { t } from '../../i18n';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { Container } from "../../globalStyles";
import { FormWraper } from "../Register/styles";
import {
    PasswordResetSection,
    ResetWrapper
} from './styles'

function PasswordReset() {
    let navigate = useNavigate();
    const urlParms = new URLSearchParams(window.location.search);
    const token: any = urlParms.get("token");
    const userId: any = urlParms.get("id");
    const { isResetSuccess, errorResetMessage} = useSelector((state: RootState) => state.resetPassword)
    const { language } = useSelector((state: RootState) => state.language)

    useEffect(() => {
        if (isResetSuccess) {
            navigate('/login');
        }
    }, [isResetSuccess, navigate])

    return (
        <PasswordResetSection>
            <Container>
                <ResetWrapper>
                {errorResetMessage ? <p>{errorResetMessage}</p> : null}
                    <FormWraper>
                    <p>{t('Please enter your new password', language)}</p>
                        <ResetPasswordForm vtoken={token} userid={userId}/>
                    </FormWraper>
                </ResetWrapper>
            </Container>
        </PasswordResetSection>
    )
}

export default PasswordReset