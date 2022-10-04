import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { resetPasswordUser } from '../features/resetPasswordSlice';
import { AppDispatch } from '../app/store';

interface AddPasswordFormData {
    userid: string;
    password: string;
    vtoken: string;
    confirmPassword: string;
  }

function useResetPasswordForm(){
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match')
    })
  ), [])
  const { register, handleSubmit, formState: { errors }} = useForm<AddPasswordFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: AddPasswordFormData) => {
    // const res: any = await AddPasswordAPI(formValues)
    // console.log("Testing response: ", res)
    // if (res.status === 200) {
    //   console.log("success ", res.data)
    //   // let details = {
    //   //   token: res.data.token,
    //   //   user: res.data.user._id,
    //   //   userEmail: res.data.user.email
    //   // }
    //   navigate('/userdashboard')
    //   window.location.reload();
    // } else {
    //   console.log("not ",res.data)
    // }
    dispatch(resetPasswordUser(formValues))
  }, [dispatch]);

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default useResetPasswordForm;
