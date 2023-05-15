import { useForm } from 'react-hook-form';
//import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import {RegistrationAPI} from './../api/auth'
import { signupUser } from './../features/registrationSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from './../app/store'

interface RegistrationFormData {
    email: string;
    acceptTerms: boolean;
  }

function useRegistrationForm(){
  //let navigate = useNavigate()
  //const [worked, setWorked] = useState<boolean>(false)
  //const [message, setMessage] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      email: yup.string().email().required('Email is required'),
      acceptTerms: yup.bool().oneOf([true], 'Please Accept Terms of use & Privacy policy before creating an account').required('Please Accept Terms of use & Privacy policy before creating an account')
    })
  ), [])
  const { register, handleSubmit, setValue, formState: { errors }} = useForm<RegistrationFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: RegistrationFormData) => {
    
    dispatch(signupUser(formValues))
    localStorage.setItem('email', formValues.email)
  }, [dispatch]);

  return {
    register,
    errors,
    setValue,
    onSubmit: handleSubmit(onSubmit),
    //worked,
    //message
  }
}

export default useRegistrationForm;
