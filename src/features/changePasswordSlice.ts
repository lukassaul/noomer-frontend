import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ChangePasswordAPI } from '../api/auth';


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
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
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
            console.log("change password action: ", action.payload)
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
