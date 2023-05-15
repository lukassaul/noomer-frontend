import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addPasswordUser } from './../features/addPasswordSlice'
import { AppDispatch } from './../app/store'
import { useDispatch } from 'react-redux';

interface AddPasswordFormData {
    userid: string;
    password: string;
    vtoken: string;
    confirmPassword: string;
  }

function usePasswordForm(){
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(16, 'Password maximum length is 16 characters'),
      confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Password does not match')
    })
  ), [])
  const { register, handleSubmit, formState: { errors }} = useForm<AddPasswordFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: AddPasswordFormData) => {
    dispatch(addPasswordUser(formValues))
  }, [dispatch]);

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default usePasswordForm;
