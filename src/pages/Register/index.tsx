import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
import {
    Container,
    RegisterSection,
    RegistrationWrapper,
    FormWraper,
    RegisterContainer,
    RegistrationLogoWrapper
} from './styles'
import { DailaiLogo, CommonContainer, CommonContentContainer, TitleTwo } from '../../globalStyles';
import { useNavigate } from "react-router-dom";
import RegistrationForm from '../../components/RegistrationForm'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { t } from '../../i18n'
import Footer from '../../components/Footer';
import Alert from '../../components/AlertMessage'
import { clearRegState } from '../../features/registrationSlice'

function Register() {

    const { language } = useSelector((state: RootState) => state.language)
    const { isRegFetching, isRegSuccess, errorRegMessage } = useSelector((state: RootState) => state.register)
    const [progress, setProgress] = useState<number>(0)
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            navigate('/userdashboard')
        }
    }, [token, navigate])

    useEffect(() => {
        if (isRegSuccess) {
            navigate('/emailsent')
            dispatch(clearRegState())
        }
    }, [isRegSuccess, navigate, dispatch])

    useEffect(() => {
        if (isRegFetching) {
            const handle = setInterval(() => {
                setProgress(progress => progress + 10)
                if (progress > 100) { return }
            }, 100);
            return () => clearInterval(handle);
        }
        setProgress(100)
    }, [isRegFetching, progress])

    return (
      <>
        <CommonContainer>
        <CommonContentContainer>
            <RegisterSection>
                <Container>
                    {isRegFetching ? <LoadingBar
                        color='#f11946'
                        progress={progress}
                        onLoaderFinished={() => setProgress(0)}
                    /> : null}
                    <RegisterContainer>
                        <RegistrationWrapper>
                            {errorRegMessage ?
                                <Alert
                                    text={errorRegMessage}
                                    bgColor="#f8d7da"
                                    txtColor="#721c24"
                                /> : null
                            }
                            <RegistrationLogoWrapper>
                                <TitleTwo style={{textAlign: 'center'}}>{t("Create Account", language)}</TitleTwo>
                            </RegistrationLogoWrapper>
                            <FormWraper>
                                <RegistrationForm />
                            </FormWraper>
                        </RegistrationWrapper>
                    </RegisterContainer>
                </Container>
            </RegisterSection>

        </CommonContentContainer>
        </CommonContainer>
        <Footer />
      </>
    )
}

export default Register
