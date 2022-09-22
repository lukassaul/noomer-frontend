import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { submitPriceRecordRating } from './../features/ratingSlice'
import { AppDispatch } from './../app/store'
import * as yup from 'yup';

interface RatingFormData {
    priceID: string,
    reviewerId: string,
    type: string,
    reason: string;
    rating: string;
  }

function useRatingForm(){
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      priceID: yup.string(),
      reviewerId: yup.string(),
      type: yup.string(),
      reason: yup.string(),
      rating: yup.string().required('Vote is required'),
    })
  ), [])
  const { register, handleSubmit, control, setValue, formState: { errors }} = useForm<RatingFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: RatingFormData) => {
    /**
      This function submits a rating for a price record.
    **/
    dispatch(submitPriceRecordRating(formValues))
  }, [dispatch]);

  return {
    register,
    control,
    setValue,
    errors,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default useRatingForm;
