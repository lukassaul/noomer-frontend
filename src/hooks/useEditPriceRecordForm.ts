import { useForm, Controller } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { editPriceRecord } from './../features/priceRecordSlice';
import * as yup from 'yup';
import { AppDispatch } from './../app/store'
import { useDispatch } from 'react-redux';

interface PriceRecordFormData {
  priceID: string;
  uploader: string,
  product: string;
  classification: string;
  quantity: number;
  unit: string;
  price: number;
  type: string;
  currency: string;
  store: string;
  location_code: string;
  location_city: string;
  location_state: string;
  location_country: string;
  location_latitude: string;
  location_longitude: string;
  product_image: string | File;
  receipt_image: string | File;
  description: string | null;
  }

function useEditPriceRecordForm(){
  //const [apimessage, setApiMessage] = useState<string | null>(null)
  //const [apistatus, setApiStatus] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  console.log("EDIT PRICE RECORD FORM")
  const validationSchema = useMemo(() => (
    yup.object().shape({
      type: yup.string().required('Type is required. Select between RETAIL or SERVICE.'),
      product: yup.string().required('Product category is required.'),
      description: yup.string().max(1500, 'Price record description should not be more than 1500 characters'),
      price: yup.number().required('Product price is required.').min(0, 'Please enter a valid price.'),
      currency: yup.string().required('Currency is required.'),
      location_city: yup.string().required('Location is required.'),
      location_country: yup.string().required('Location is required.'),
      //unit: yup.string().required('Unit is required.'),
      quantity: yup.number().required('Quantity is required.').moreThan(0, 'Please product quantity.'),
    })
  ), [])
  const { register, handleSubmit, control, setValue, setError, clearErrors, watch, formState: { errors, isValid } } = useForm<PriceRecordFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = useCallback(async(formValues: PriceRecordFormData) => {
    console.log("edit price record form data: ", formValues)

    /**
      This function submits an update for a price record.
    **/
    dispatch(editPriceRecord(formValues))
  }, [dispatch]);

  return {
    register,
    Controller,
    setValue,
    setError,
    clearErrors,
    control,
    errors,
    onSubmit: handleSubmit(onSubmit),
    watch,
    isValid
  }
}

export default useEditPriceRecordForm;
