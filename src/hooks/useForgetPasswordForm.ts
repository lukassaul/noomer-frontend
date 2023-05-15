import { useForm } from 'react-hook-form';
//import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { requestPasswordUser } from '../features/requestPasswordSlice';
import { AppDispatch } from './../app/store'

interface ForgetPasswordFormData {
    email: string;
  }

function useForgetPasswordForm(){
  //let navigate = useNavigate()
  //const [worked, setWorked] = useState<boolean>(false)
  //const [message, setMessage] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      email: yup.string().email().required('Email is required'),
    })
  ), [])
  const { register, handleSubmit, formState: { errors }} = useForm<ForgetPasswordFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: ForgetPasswordFormData) => {
    dispatch(requestPasswordUser(formValues))
  }, [dispatch]);

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    //worked,
    //message
  }
}

export default useForgetPasswordForm;
