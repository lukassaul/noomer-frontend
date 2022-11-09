import { useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SetUserProfileAPI} from './../api/user';
import { getDashboard } from '../features/dashboardSlice';
import { AppDispatch } from '../app/store';
import ToastNotification from '../components/Toast';


interface ProfileEditFormData {
  profileId: string,
  userId: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  profile_pic: string | File,
  city: string,
  district: string,
  state: string,
  country: string,
  latitude: string,
  longitude: string
}

function useProfileEditForm(){
  const dispatch = useDispatch<AppDispatch>()

  const [apimessage, setApiMessage] = useState<string | null>(null)
  const [apistatus, setApiStatus] = useState<string | null>(null)

  const validationSchema = useMemo(() => (
    yup.object().shape({
      profileId:yup.string().required('Profile id is required'),
      userId: yup.string().required('User id is required'),
      first_name: yup.string(),
      last_name: yup.string(),
      phone_number: yup.string(),
      city: yup.string(),
      district: yup.string(),
      state: yup.string(),
      country: yup.string(),
    })
  ), [])
  const { register, handleSubmit, setValue, formState: { errors }} = useForm<ProfileEditFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: ProfileEditFormData) => {
    //console.log("form values: ", formValues)
    try {
      const res: any = await SetUserProfileAPI(formValues)
      let profileUserId = localStorage.getItem('user')
      window.scrollTo(0, 0);
      if (res.status === 200) {
        setApiStatus("SUCCESS")
        setApiMessage("Profile successfully updated")
        ToastNotification({message: "Profile successfully updated.", type: "SUCCESS"})
        if(profileUserId) dispatch(getDashboard(profileUserId))
      } else {
        setApiStatus("ERROR")
        setApiMessage(res.data.message)
        ToastNotification({message: res.data.message, type: "ERROR"})
      }
    } catch(e) {
      console.log('error in edit profile api: ');
    }
  }, [dispatch]);

  return {
    register,
    setValue,
    errors,
    onSubmit: handleSubmit(onSubmit),
    apistatus,
    apimessage
  }
}

export default useProfileEditForm;
