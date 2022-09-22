import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { t } from '../../i18n'
import useForgetPasswordForm from '../../hooks/useForgetPasswordForm';
import Button from '../Button'
import { ForgetPasswordInput, ForgetPasswordTitle, FormWrapper } from './styles';
import { FormError, TitleTwo } from '../../globalStyles'


function ForgetPasswordForm() {
    const { language } = useSelector((state: RootState) => state.language)
    const { register, onSubmit, errors } = useForgetPasswordForm();
    return (
      <FormWrapper>
        <form onSubmit={onSubmit} aria-label="form">
            <TitleTwo style={{textAlign: 'center'}}>{t("Forget Password", language)}</TitleTwo>
            <p style={{margin: '1em 0'}}>{t("Email address", language)}</p>
            <ForgetPasswordInput
                {...register("email")}
                name="email"
                type="email"
                placeholder='E-mail' />
            <FormError>{errors.email?.message}</FormError>
            <div style={{margin: '3.5em 0', display: 'flex', justifyContent: 'center'}}>
              <Button type="submit" color='gray'>{t("Submit", language)}</Button>
            </div>
        </form>
      </FormWrapper>
    )
}

export default ForgetPasswordForm
