import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginAPI } from './../api/auth'
import ToastNotification from './../components/Toast'

interface loginState {
    isLogSuccess: boolean,
    isLogFetching: boolean,
    errorLogMessage: string | null
    userRole: string
}

interface ValidationErrors {
    errorLogMessage: string | null
}

const initialState: loginState = {
    isLogSuccess: false,
    isLogFetching: false,
    errorLogMessage: "",
    userRole: "User"
}

export const loginUser = createAsyncThunk<
    any,
    { email: string, password: string},
    { rejectValue: ValidationErrors }
>(
    'user/login',
    async (formData, thunkAPI) => {
        const response = await LoginAPI(formData)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) {
            ToastNotification({message: response.data.message, type: "ERROR"})
            return thunkAPI.rejectWithValue(await response.data.message)
          } else {
            ToastNotification({message: response.data, type: "ERROR"})
            return thunkAPI.rejectWithValue(await response.data)
          }
        }
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userEmail', response.data.email)
        localStorage.setItem('user', response.data.user._id)
        localStorage.setItem('userFirstname', response.data.user.first_name)
        localStorage.setItem('userLastname', response.data.user.last_name)
        return await response.data
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearLogState: (state) => {
            state.errorLogMessage = '';
            state.isLogSuccess = false;
            state.isLogFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {

            state.isLogFetching = false
            state.isLogSuccess = true
            if(payload.hasOwnProperty('user')) state.userRole = payload.user.user_role

        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLogFetching = false
            if (action.payload) {
                state.errorLogMessage = action.payload as unknown as string
              } else {
                state.errorLogMessage = action.error.message!
              }
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLogFetching = true
        })
    },
})

export const { clearLogState } = loginSlice.actions;

export default loginSlice.reducer
