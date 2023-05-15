import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ChangePasswordAPI } from '../api/auth';
import ToastNotification from './../components/Toast'


interface ChangePasswordState {
    isChangeSuccess: boolean,
    isChangeFetching: boolean,
    errorChangeMessage: string | null
}

interface ValidationErrors {
    errorAddMessage: string | null
}

const initialState: ChangePasswordState = {
    isChangeSuccess: false,
    isChangeFetching: false,
    errorChangeMessage: ""
}

export const changePasswordUser = createAsyncThunk<
    void,
    { userid: string, password: string},
    { rejectValue: ValidationErrors }
>(
    'user/change',
    async (formData, thunkAPI) => {
        const response = await ChangePasswordAPI(formData)

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

export const ChangePasswordSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {
        clearCPState: (state) => {
            state.errorChangeMessage = '';
            state.isChangeSuccess = false;
            state.isChangeFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(changePasswordUser.fulfilled, (state, {payload}) => {
            state.isChangeFetching = false
            state.isChangeSuccess = true
        })
        builder.addCase(changePasswordUser.rejected, (state, action) => {
            state.isChangeFetching = false
            if (action.payload) {
                state.errorChangeMessage = action.payload as unknown as string
              } else {
                state.errorChangeMessage = action.error.message!
              }
        })
        builder.addCase(changePasswordUser.pending, (state) => {
            state.isChangeFetching = true
        })
    },
})

export const { clearCPState } = ChangePasswordSlice.actions;

export default ChangePasswordSlice.reducer
