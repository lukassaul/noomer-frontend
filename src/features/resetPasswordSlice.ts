import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ResetPasswordAPI } from '../api/auth';


interface ResetPasswordState {
    isResetSuccess: boolean,
    isResetFetching: boolean,
    errorResetMessage: string | null
}

interface ValidationErrors {
    errorAddMessage: string | null
}

const initialState: ResetPasswordState = {
    isResetSuccess: false,
    isResetFetching: false,
    errorResetMessage: ""
}

export const resetPasswordUser = createAsyncThunk<
    void,
    { userid: string, password: string, vtoken: string},
    { rejectValue: ValidationErrors }
>(
    'user/reset',
    async (formData, thunkAPI) => {
        const response = await ResetPasswordAPI(formData)
        console.log("Response", response.data)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const ResetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        clearAddState: (state) => {
            state.errorResetMessage = '';
            state.isResetSuccess = false;
            state.isResetFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(resetPasswordUser.fulfilled, (state, {payload}) => {
            state.isResetFetching = false
            state.isResetSuccess = true
            console.log("fulfiled: ", payload)
        })
        builder.addCase(resetPasswordUser.rejected, (state, action) => {
            console.log("action: ", action)
            if (action.payload) {
                console.log("error message payload: ", action.payload)
                state.errorResetMessage = action.payload as unknown as string
              } else {
                console.log("error message error: ", action.error.message)
                state.errorResetMessage = action.error.message!
              }
        })
        builder.addCase(resetPasswordUser.pending, (state) => {
            state.isResetFetching = true
        })
    },
})

export const { clearAddState } = ResetPasswordSlice.actions;

export default ResetPasswordSlice.reducer
