import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPriceRecordRating } from './../features/ratingSlice'
import { AppDispatch } from './../app/store'
import * as yup from 'yup';

interface RatingFormEditData {
    ratingID: string,
    priceID: string,
    reviewerId: string,
    reason: string;
    rating: string;
  }

function useRatingFormEdit(){
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = useMemo(() => (
    yup.object().shape({
      ratingID: yup.string(),
      priceID: yup.string(),
      reviewerId: yup.string(),
      reason: yup.string().max(1500, 'Rating description should not be more than 1500 characters'),
      rating: yup.string().required('Vote is required'),
    })
  ), [])
  const { register, handleSubmit, control, setValue, formState: { errors }} = useForm<RatingFormEditData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = useCallback(async(formValues: RatingFormEditData) => {
    /**
      This function submits a rating for a price record.
    **/
    console.log("rating form edit formvalues: ", formValues)
    dispatch(editPriceRecordRating(formValues))
  }, [dispatch]);

  return {
    register,
    control,
    setValue,
    errors,
    onSubmit: handleSubmit(onSubmit)
  }
}

export default useRatingFormEdit;
