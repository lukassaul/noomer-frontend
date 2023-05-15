import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ResetPasswordAPI } from '../api/auth';
import ToastNotification from './../components/Toast'


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
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) {
            ToastNotification({message: response.data.message, type: "ERROR"})
            return thunkAPI.rejectWithValue(await response.data.message)
          } else {
            ToastNotification({message: response.data, type: "ERROR"})
            return thunkAPI.rejectWithValue(await response.data)
          }
        } else {
          ToastNotification({message: "Password successfully updated. Login using your new password.", type: "SUCCESS"})
          return await response.data
        }
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
        })
        builder.addCase(resetPasswordUser.rejected, (state, action) => {

            state.isResetFetching = false
            if (action.payload) {
                state.errorResetMessage = action.payload as unknown as string
              } else {
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
