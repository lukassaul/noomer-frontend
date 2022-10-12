import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { t } from '../../i18n';
import useChangePasswordForm from '../../hooks/useChangePasswordForm';
import Button from '../Button'
import { FormWrapper, PasswordInput } from './styles'
import { FormError, FormInputWhole, RightLinkContainer } from '../../globalStyles';
// interface Resetpassword {
//     vtoken: string | number | readonly string[] | undefined
//     userid: string | number | readonly string[] | undefined
// }

function ChangePasswordForm() {
    const { language } = useSelector((state: RootState) => state.language)
    const [userId, setUserId] = useState<string>('')

    const { register, onSubmit, setValue, errors } = useChangePasswordForm();
    const {dashboard} = useSelector((state: RootState) => state.dashboard)
    useEffect(() => {
        if (dashboard.profile) {
            setUserId(dashboard.profile.user)
            setValue("userid", dashboard.profile.user)
        }
    }, [dashboard, setValue])

    return (
      <FormWrapper>
        <form onSubmit={onSubmit} aria-label="form">
            <FormInputWhole
            {...register("password")}
            name="password"
            type="password"
            placeholder='Password'
            aria-label='Password' />
            <FormError>{errors.password?.message}</FormError>

            <FormInputWhole
            {...register("confirmPassword")}
            name="confirmPassword"
            type="password"
            placeholder='Confirm password'
            aria-label='ConfirmPassword' />
            <input
            {...register("userid")}
            name="userid"
            type="hidden"
            defaultValue={userId}/>
            <FormError style={{marginBottom: '12px'}}>{errors.confirmPassword?.message}</FormError>

            <RightLinkContainer style={{padding: '2em 0'}}>
              <Button type="submit" color="noomerRed">{t("Change Password", language)}</Button>
            </RightLinkContainer>
        </form>
      </FormWrapper>
    )
}

export default ChangePasswordForm
