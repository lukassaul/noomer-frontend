import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreatePriceRecordAPI } from '../api/priceRecord';


interface SubmitNewPriceRecordState {
    isSubmitPriceRecordSuccess: boolean,
    isSubmitPriceRecordFetching: boolean,
    errorSubmitPriceRecordMessage: string | null,
    priceRecordID: string
}

interface SubmitValidationErrors {
    errorSubmitPriceRecordMessage: string | null
}

const initialState: SubmitNewPriceRecordState = {
    isSubmitPriceRecordSuccess: false,
    isSubmitPriceRecordFetching: false,
    errorSubmitPriceRecordMessage: "",
    priceRecordID: ""
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
        if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
        else return thunkAPI.rejectWithValue(await response.data)
      }
      return response.data
    }
)

export const priceRecordSlice = createSlice({
    name: 'priceRecord',
    initialState,
    reducers: {
        clearSubmitState: (state) => {
          state.isSubmitPriceRecordSuccess = false;
          state.isSubmitPriceRecordFetching = false;
          state.errorSubmitPriceRecordMessage = "";
          state.priceRecordID = "";
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
    },
})

export const { clearSubmitState } = priceRecordSlice.actions;

export default priceRecordSlice.reducer
