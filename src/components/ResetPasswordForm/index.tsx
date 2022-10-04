import React from 'react'
import useResetPasswordForm from '../../hooks/useResetPasswordForm';
import Button from '../Button'
import { FormError } from '../../globalStyles'
import { FormWrapper, PasswordInput } from './styles'

interface Resetpassword {
    vtoken: string | number | readonly string[] | undefined
    userid: string | number | readonly string[] | undefined
}

function ResetPasswordForm({vtoken, userid}: Resetpassword) {

    const { register, onSubmit, errors } = useResetPasswordForm();

    return (
      <FormWrapper>
        <form onSubmit={onSubmit} aria-label="form">
            <PasswordInput
            {...register("password")}
            name="password"
            type="password"
            placeholder='Password'
            aria-label='Password' />
            <FormError>{errors.password?.message}</FormError>
            <PasswordInput
            {...register("confirmPassword")}
            name="confirmPassword"
            type="password"
            placeholder='Confirm password'
            aria-label='ConfirmPassword' />
            <input
            {...register("vtoken")}
            name="vtoken"
            type="hidden"
            defaultValue={vtoken} />
            <input
            {...register("userid")}
            name="userid"
            type="hidden"
            defaultValue={userid} />
            <FormError style={{marginBottom: '12px'}}>{errors.confirmPassword?.message}</FormError>
            <Button type="submit">Reset Password</Button>
        </form>
      </FormWrapper>
    )
}

export default ResetPasswordForm
