import useLoginForm from '../../hooks/useLoginForm';
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { t } from '../../i18n'
import {
    LoginInput,
    LoginInputFirst,
    LoginLink,
    WholeWrapper,
    LoginTitle,
    LoginButtonWrapper,
    SignupLink,
    SignupWrapper
} from './styles'
import { FormError, FormInputWholeAccount, TitleTwo } from '../../globalStyles'
import Button from '../Button'


function LoginForm() {

    const { language } = useSelector((state: RootState) => state.language)
    const { register, onSubmit, errors } = useLoginForm();

    return (
        <form onSubmit={onSubmit} aria-label="form">
            <WholeWrapper>
                <TitleTwo style={{textAlign: 'center'}}>{t("Welcome Back", language)}</TitleTwo>
                <FormInputWholeAccount
                    {...register("email")}
                    name="email"
                    type="email"
                    placeholder='Enter email'
                    aria-label='Email'
                    className="mb1halfem" />
                <FormError>{errors.email?.message}</FormError>
                <FormInputWholeAccount
                    {...register("password")}
                    name="password"
                    type="password"
                    placeholder='Enter password'
                    aria-label='Password'
                    className="mb1halfem" />
                <FormError>{errors.password?.message}</FormError>
                <LoginButtonWrapper>
                    <Button type="submit" color='fifthRed'>{t("Login", language)}</Button>
                </LoginButtonWrapper>
                <LoginLink to={'/forgot'}>{t("Forget Password", language)}?</LoginLink>
                <SignupWrapper>
                  <SignupLink to={'/signup'}> Don't have an account? Create one</SignupLink>
                </SignupWrapper>
            </WholeWrapper>
        </form>
    )
}

export default LoginForm;
