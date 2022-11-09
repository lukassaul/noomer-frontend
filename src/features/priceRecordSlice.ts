import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreatePriceRecordAPI, EditPriceRecordAPI } from '../api/priceRecord';
import ToastNotification from './../components/Toast'

interface PriceRecordState {
    isSubmitPriceRecordSuccess: boolean,
    isSubmitPriceRecordFetching: boolean,
    errorSubmitPriceRecordMessage: string | null,
    isEditPriceRecordSuccess: boolean,
    isEditPriceRecordFetching: boolean,
    errorEditPriceRecordMessage: string | null,
    priceRecordID: string,
    recordToEdit: {
      _id: string,
      uploader: string,
      type: string,
      product: {
        _id: string,
        category: {
          category: string,
        },
        product_name: string,
      },
      classification: string,
      location_code: string,
      location_city: string,
      location_state: string,
      location_country: string,
      location_latitude: string,
      location_longitude: string,
      price: number,
      currency: string,
      unit: string,
      quantity: number | null,
      store: string | null,
      product_image: string | null,
      receipt_image: string | null,
      description: string | null
    }
}

interface SubmitValidationErrors {
    errorSubmitPriceRecordMessage: string | null
}

interface EditValidationErrors {
    errorEditPriceRecordMessage: string | null
}

const initialState: PriceRecordState = {
    isSubmitPriceRecordSuccess: false,
    isSubmitPriceRecordFetching: false,
    errorSubmitPriceRecordMessage: "",
    isEditPriceRecordSuccess: false,
    isEditPriceRecordFetching: false,
    errorEditPriceRecordMessage: "",
    priceRecordID: "",
    recordToEdit: {
      _id: "",
      uploader: "",
      type: "",
      product: {
        _id: "",
        category: {
          category: "",
        },
        product_name: "",
      },
      classification: "",
      location_code: "",
      location_city: "",
      location_state: "",
      location_country: "",
      location_latitude: "",
      location_longitude: "",
      price: 0,
      currency: "",
      unit: "",
      quantity: 0,
      store: "",
      product_image: "",
      receipt_image: "",
      description: ""
    }
}

export const submitNewPriceRecord = createAsyncThunk<
    void,
    {
      uploader: string,
      type: string,
      product: string,
      classification: string,
      location_code: string,
      location_city: string,
      location_state: string,
      location_country: string,
      location_latitude: string,
      location_longitude: string,
      price: number,
      currency: string,
      unit: string,
      quantity: number,
      store: string | null,
      product_image: string | File,
      receipt_image: string | File,
      description: string | null
    },
    { rejectValue: SubmitValidationErrors }
>(
    'priceRecord/submit',
    async (formData, thunkAPI) => {
      const response = await CreatePriceRecordAPI(formData)
      console.log("Response", response.data)
      if (response.status !== 200) {
        if (response.data.hasOwnProperty('message')) {
          ToastNotification({message: response.data.message, type: "ERROR"})
          return thunkAPI.rejectWithValue(await response.data.message)
        } else {
          ToastNotification({message: response.data, type: "ERROR"})
          return thunkAPI.rejectWithValue(await response.data)
        }
      } else {
        ToastNotification({message: "Price record successfully created.", type: "SUCCESS"})
        return response.data
      }
    }
)


export const editPriceRecord = createAsyncThunk<
    void,
    {
      priceID: string,
      uploader: string,
      type: string,
      product: string,
      classification: string,
      location_code: string,
      location_city: string,
      location_state: string,
      location_country: string,
      location_latitude: string,
      location_longitude: string,
      price: number,
      currency: string,
      unit: string,
      quantity: number,
      store: string | null,
      product_image: string | File,
      receipt_image: string | File,
      description: string | null
    },
    { rejectValue: EditValidationErrors }
>(
    'priceRecord/edit',
    async (formData, thunkAPI) => {
      const response = await EditPriceRecordAPI(formData)
      console.log("edit Response", response.data)
      if (response.status !== 200) {
        if (response.data.hasOwnProperty('message')) {
          ToastNotification({message: response.data.message, type: "ERROR"})
          return thunkAPI.rejectWithValue(await response.data.message)
        }else {
          ToastNotification({message: response.data, type: "ERROR"})
          return thunkAPI.rejectWithValue(await response.data)
        }
      } else {
        ToastNotification({message: "Price record successfully updated.", type: "SUCCESS"})
        return response.data
      }
    }
)


export const priceRecordSlice = createSlice({
    name: 'priceRecord',
    initialState,
    reducers: {
      priceEdit: (state, {payload}) => {
          state.recordToEdit = payload
        },
      clearSubmitState: (state) => {
        state.isSubmitPriceRecordSuccess = false;
        state.isSubmitPriceRecordFetching = false;
        state.errorSubmitPriceRecordMessage = "";
        state.isEditPriceRecordSuccess = false;
        state.isEditPriceRecordFetching = false;
        state.errorEditPriceRecordMessage = "";
        state.priceRecordID = "";
        state.recordToEdit = {
          _id: "",
          uploader: "",
          type: "",
          product: {
            _id: "",
            category: {
              category: "",
            },
            product_name: "",
          },
          classification: "",
          location_code: "",
          location_city: "",
          location_state: "",
          location_country: "",
          location_latitude: "",
          location_longitude: "",
          price: 0,
          currency: "",
          unit: "",
          quantity: 0,
          store: "",
          product_image: "",
          receipt_image: "",
          description: ""
        }
      },
    },
    extraReducers: (builder) => {
        builder.addCase(submitNewPriceRecord.fulfilled, (state, action) => {
          let res = action.payload as unknown as any
          console.log("reducer action: ", action.payload)
          console.log("reducer res: ", res)

          state.isSubmitPriceRecordFetching = false
          state.isSubmitPriceRecordSuccess = true
          state.priceRecordID = res.price._id
          console.log("state.priceRecordID ", state.priceRecordID)
          console.log("state.isSubmitPriceRecordFetching ", state.isSubmitPriceRecordFetching)
          console.log("state.isSubmitPriceRecordSuccess ", state.isSubmitPriceRecordSuccess)
        })
        builder.addCase(submitNewPriceRecord.rejected, (state, action) => {
            console.log("action: ", action)
            if (action.payload) {
                console.log("error message payload: ", action.payload)
                state.errorSubmitPriceRecordMessage = action.payload as unknown as string
              } else {
                console.log("error message error: ", action.error.message)
                state.errorSubmitPriceRecordMessage = action.error.message!
              }
        })
        builder.addCase(submitNewPriceRecord.pending, (state) => {
            state.isSubmitPriceRecordFetching = true
        })

        builder.addCase(editPriceRecord.fulfilled, (state, action) => {
          let res = action.payload as unknown as any
          console.log("reducer action: ", action.payload)
          console.log("reducer res: ", res)

          state.isEditPriceRecordFetching = false
          state.isEditPriceRecordSuccess = true
          state.priceRecordID = res.price._id
          console.log("state.priceRecordID ", state.priceRecordID)
          console.log("state.isEditPriceRecordFetching ", state.isEditPriceRecordFetching)
          console.log("state.isEditPriceRecordSuccess ", state.isEditPriceRecordSuccess)
        })
        builder.addCase(editPriceRecord.rejected, (state, action) => {
            console.log("action: ", action)
            if (action.payload) {
                console.log("error message payload: ", action.payload)
                state.errorEditPriceRecordMessage = action.payload as unknown as string
              } else {
                console.log("error message error: ", action.error.message)
                state.errorEditPriceRecordMessage = action.error.message!
              }
        })
        builder.addCase(editPriceRecord.pending, (state) => {
            state.isEditPriceRecordFetching = true
        })
    },
})

export const { priceEdit, clearSubmitState } = priceRecordSlice.actions;

export default priceRecordSlice.reducer
