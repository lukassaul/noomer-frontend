import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostProductComparison } from '../api/comparison';

interface searchState {
  isFetchingProductComparison: boolean,
  isProductComparisonSuccess: boolean,
  errorFetchingProductComparisonMessage: string,
  noomer: any
}

const initialState: searchState = {
    isFetchingProductComparison: false,
    isProductComparisonSuccess: false,
    errorFetchingProductComparisonMessage: '',
    noomer: {}
}

interface SubmitValidationErrors {
    errorFetchingProductComparisonMessage: string | null
}

export const postProductComparison = createAsyncThunk<
      void,
      {
        product_a: string,
        city_a: string,
        state_a: string,
        country_a: string,
        product_b: string,
        city_b: string,
        state_b: string,
        country_b: string,
      },
      { rejectValue: SubmitValidationErrors }
  >(
      'comparison/noomer',
      async (formData, thunkAPI) => {
        const response = await PostProductComparison(formData)
        console.log("Response", response.data)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return response.data
      }
  )

export const comparisonSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(postProductComparison.fulfilled, (state, {payload}) => {
            state.isFetchingProductComparison = false
            state.isProductComparisonSuccess = true
            state.noomer = payload
        })
        builder.addCase(postProductComparison.rejected, (state, action) => {

            if (action.payload) {
                state.errorFetchingProductComparisonMessage = action.payload as unknown as string
              } else {
                state.errorFetchingProductComparisonMessage = action.error.message!
              }
        })
        builder.addCase(postProductComparison.pending, (state) => {
            state.isFetchingProductComparison = true
        })
    },
})

export const { } = comparisonSlice.actions;

export default comparisonSlice.reducer
