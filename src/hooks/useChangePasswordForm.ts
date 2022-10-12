import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { changePasswordUser } from '../features/changePasswordSlice';
import { AppDispatch } from '../app/store';

interface AddPasswordFormData {
    userid: string;
    password: string;
    confirmPassword: string;
}

function useChangePasswordForm(){
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match')
    })
  ), [])
  const { register, handleSubmit, setValue, formState: { errors }} = useForm<AddPasswordFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: AddPasswordFormData) => {
    dispatch(changePasswordUser(formValues))
  }, [dispatch]);

  return {
    register,
    errors,
    setValue,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default useChangePasswordForm;
