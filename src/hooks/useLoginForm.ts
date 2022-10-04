import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from './../features/loginSlice'
import { clearCPState } from './../features/changePasswordSlice'
import { AppDispatch } from './../app/store'
import * as yup from 'yup';


interface LoginFormData {
    email: string;
    password: string;
  }

function useLoginForm(){
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      email: yup.string()
        .email()
        .required('Email is required'),
        //.max(70, 'Email should not be more than 70 characters'),
      password: yup.string()
        .required('Password is required')
        //.min(6, 'Password should be 6 or more characters')
        //.max(20, 'Password should not be more than 20 characters'),
    })
  ), [])
  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: LoginFormData) => {
    /**
      This function clears change password redux states.
      When user performs a change password request, it will be redirected to login
      Login detects isChangeSuccess state to show alert message for successful change password operation
    **/
    dispatch(clearCPState())
    dispatch(loginUser(formValues))
  }, [dispatch]);

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default useLoginForm;
