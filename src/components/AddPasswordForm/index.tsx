import useAddPasswordForm from '../../hooks/useAddPasswordForm';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { t } from '../../i18n';
import Button from '../Button'
import { FormError, FormInputWhole } from '../../globalStyles'

interface AddPassword {
    vtoken: string | number | readonly string[] | undefined
    userid: string | number | readonly string[] | undefined
}

function AddPasswordForm({vtoken, userid}: AddPassword) {
    const { language } = useSelector((state: RootState) => state.language)
    const { register, onSubmit, errors } = useAddPasswordForm();

    return (
        <form onSubmit={onSubmit} aria-label="form">
            <FormInputWhole
            {...register("password")}
            name="password"
            type="password"
            className="formInputVerification"
            placeholder='Password'
            aria-label='Password' />
            <FormError>{errors.password?.message}</FormError>
            <FormInputWhole
            {...register("confirmPassword")}
            name="confirmPassword"
            type="password"
            className="formInputVerification"
            placeholder='Confirm password'
            aria-label='ConfirmPassword' />
            <FormInputWhole
            {...register("vtoken")}
            name="vtoken"
            type="hidden"
            defaultValue={vtoken} />
            <FormInputWhole
            {...register("userid")}
            name="userid"
            type="hidden"
            defaultValue={userid} />
            <FormError>{errors.confirmPassword?.message}</FormError>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button type="submit" color="noomerRed">{t("Submit", language)}</Button>
            </div>
        </form>
    )
}

export default AddPasswordForm;
