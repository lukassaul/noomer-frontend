import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SubmitRatingAPI, EditRatingAPI } from '../api/rating';
import ToastNotification from '../components/Toast';


interface RatingState {
    isSubmitRatingSuccess: boolean,
    isSubmitRatingFetching: boolean,
    errorSubmitRatingMessage: string | null,
    isEditRatingSuccess: boolean,
    isEditRatingFetching: boolean,
    errorEditRatingMessage: string | null,
    editRating: {
      _id: string,
      vote: string,
      reason: string,
      priceId: any,
      reviewerId: string,
      ratingID: string
    }
}

interface SubmitValidationErrors {
    errorSubmitRatingMessage: string | null
}

interface EditRatingState {
    isEditRatingSuccess: boolean,
    isEditRatingFetching: boolean,
    errorEditRatingMessage: string | null
}

interface EditValidationErrors {
    errorEditRatingMessage: string | null
}

const initialState: RatingState = {
    isSubmitRatingSuccess: false,
    isSubmitRatingFetching: false,
    errorSubmitRatingMessage: "",
    isEditRatingSuccess: false,
    isEditRatingFetching: false,
    errorEditRatingMessage: "",
    editRating: {
      _id: "",
      vote: "",
      reason: "",
      priceId: {},
      reviewerId: "",
      ratingID: ""
    }
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
          if (response.data.hasOwnProperty('message')) {
            ToastNotification({message: response.data.message, type: "ERROR"})
            return thunkAPI.rejectWithValue(await response.data.message)
          } else {
            ToastNotification({message: response.data, type: "ERROR"})
            return thunkAPI.rejectWithValue(await response.data)
          }
        } else {
          ToastNotification({message: "Rating successfully submitted.", type: "SUCCESS"})
          return await response.data
        }
    }
)

export const editPriceRecordRating = createAsyncThunk<
    void,
    { ratingID: string, priceID: string, reviewerId: string, reason: string, rating: string},
    { rejectValue: EditValidationErrors }
>(
    'rating/edit',
    async (formData, thunkAPI) => {
        console.log("edit price record rating")
        const response = await EditRatingAPI(formData)
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
      ratingEdit: (state, {payload}) => {
          state.editRating = payload
        },
      clearRatingState: (state) => {
          state.errorSubmitRatingMessage = '';
          state.isSubmitRatingSuccess = false;
          state.isSubmitRatingFetching = false;
          state.errorEditRatingMessage = '';
          state.isEditRatingSuccess = false;
          state.isEditRatingFetching = false;
          state.editRating = {
            _id: "",
            vote: "",
            reason: "",
            priceId: {},
            reviewerId: "",
            ratingID: ""
          }
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
            state.isSubmitRatingFetching = false
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

        builder.addCase(editPriceRecordRating.fulfilled, (state, {payload}) => {
            state.isEditRatingFetching = false
            state.isEditRatingSuccess = true
            console.log("fulfiled: ", payload)
        })
        builder.addCase(editPriceRecordRating.rejected, (state, action) => {
            console.log("action: ", action)
            state.isEditRatingFetching = false
            if (action.payload) {
                console.log("error message payload: ", action.payload)
                state.errorEditRatingMessage = action.payload as unknown as string
              } else {
                console.log("error message error: ", action.error.message)
                state.errorEditRatingMessage = action.error.message!
              }
        })
        builder.addCase(editPriceRecordRating.pending, (state) => {
            state.isEditRatingFetching = true
        })
    },
})

export const { clearRatingState,ratingEdit } = RatingSlice.actions;

export default RatingSlice.reducer
