import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { t } from '../../i18n';
import { useNavigate } from "react-router-dom";
import AddPasswordForm from "../../components/AddPasswordForm";
import { Container, TitleTwo } from "../../globalStyles";
import { FormWraper } from "../Register/styles";
import {
    VerificationSection,
    VerifyWrapper
} from './styles'

function Verification() {
    let navigate = useNavigate();
    const { language } = useSelector((state: RootState) => state.language)
    const urlParms = new URLSearchParams(window.location.search);
    const token: any = urlParms.get("token");
    const userId: any = urlParms.get("id");

    const { isAddSuccess, errorAddMessage} = useSelector((state: RootState) => state.addPassword)

    useEffect(() => {
        if (isAddSuccess) {
            navigate('/dashboard')
        }
    }, [isAddSuccess, navigate])

    return (
        <VerificationSection>
            <Container>
                <VerifyWrapper>
                {errorAddMessage ? <p>{errorAddMessage}</p> : null}
                    <FormWraper>
                    <TitleTwo>{t("Please set your password to continue registration process", language)}</TitleTwo>
                        <AddPasswordForm vtoken={token} userid={userId}/>
                    </FormWraper>
                </VerifyWrapper>
            </Container>
        </VerificationSection>
    )
}

export default Verification
