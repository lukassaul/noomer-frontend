import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ResetPasswordRequestAPI } from '../api/auth';


interface RequestPasswordState {
    isRequestSuccess: boolean,
    isRequestFetching: boolean,
    errorRequestMessage: string | null
}

interface ValidationErrors {
    errorAddMessage: string | null
}

const initialState: RequestPasswordState = {
    isRequestSuccess: false,
    isRequestFetching: false,
    errorRequestMessage: ""
}

export const requestPasswordUser = createAsyncThunk<
    void,
    { email: string},
    { rejectValue: ValidationErrors }
>(
    'user/request_password',
    async (formData, thunkAPI) => {
        const response = await ResetPasswordRequestAPI(formData)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const RequestPasswordSlice = createSlice({
    name: 'requestPassword',
    initialState,
    reducers: {
        clearAddState: (state) => {
            state.errorRequestMessage = '';
            state.isRequestSuccess = false;
            state.isRequestFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(requestPasswordUser.fulfilled, (state, {payload}) => {
            state.isRequestFetching = false
            state.isRequestSuccess = true
        })
        builder.addCase(requestPasswordUser.rejected, (state, action) => {
            if (action.payload) {
                state.errorRequestMessage = action.payload as unknown as string
              } else {
                state.errorRequestMessage = action.error.message!
              }
        })
        builder.addCase(requestPasswordUser.pending, (state) => {
            state.isRequestFetching = true
        })
    },
})

export const { clearAddState } = RequestPasswordSlice.actions;

export default RequestPasswordSlice.reducer
