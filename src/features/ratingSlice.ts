import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SubmitRatingAPI } from '../api/rating';


interface SubmitRatingState {
    isSubmitRatingSuccess: boolean,
    isSubmitRatingFetching: boolean,
    errorSubmitRatingMessage: string | null
}

interface SubmitValidationErrors {
    errorSubmitRatingMessage: string | null
}

const initialState: SubmitRatingState = {
    isSubmitRatingSuccess: false,
    isSubmitRatingFetching: false,
    errorSubmitRatingMessage: ""
}

export const submitPriceRecordRating = createAsyncThunk<
    void,
    { priceID: string, reviewerId: string, type: string, reason: string, rating: string},
    { rejectValue: SubmitValidationErrors }
>(
    'rating/submit',
    async (formData, thunkAPI) => {
        const response = await SubmitRatingAPI(formData)
        console.log("Response", response.data)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const RatingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        clearSubmitState: (state) => {
            state.errorSubmitRatingMessage = '';
            state.isSubmitRatingSuccess = false;
            state.isSubmitRatingFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(submitPriceRecordRating.fulfilled, (state, {payload}) => {
            state.isSubmitRatingFetching = false
            state.isSubmitRatingSuccess = true
            console.log("fulfiled: ", payload)
        })
        builder.addCase(submitPriceRecordRating.rejected, (state, action) => {
            console.log("action: ", action)
            if (action.payload) {
                console.log("error message payload: ", action.payload)
                state.errorSubmitRatingMessage = action.payload as unknown as string
              } else {
                console.log("error message error: ", action.error.message)
                state.errorSubmitRatingMessage = action.error.message!
              }
        })
        builder.addCase(submitPriceRecordRating.pending, (state) => {
            state.isSubmitRatingFetching = true
        })
    },
})

export const { clearSubmitState } = RatingSlice.actions;

export default RatingSlice.reducer
