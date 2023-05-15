import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RegistrationAPI } from './../api/auth'
import ReactGA from 'react-ga4';

interface RegisterState {
    isRegSuccess: boolean,
    isRegFetching: boolean,
    errorRegMessage: string | null
}

interface ValidationErrors {
    errorAddMessage: string | null
}

const initialState: RegisterState = {
    isRegSuccess: false,
    isRegFetching: false,
    errorRegMessage: ""
}

export const signupUser = createAsyncThunk<
    any,
    { email: string},
    { rejectValue: ValidationErrors }
>(
    'user/signup',
    async (formData, thunkAPI) => {
        const response = await RegistrationAPI(formData)
        if (response.status !== 201) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }

        ReactGA.event({
          category: 'User',
          action: 'Created an Account'
        });
        return await response.data
    }
)

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        clearRegState: (state) => {
            state.errorRegMessage = '';
            state.isRegSuccess = false;
            state.isRegFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.fulfilled, (state, {payload}) => {
            state.isRegFetching = false
            state.isRegSuccess = true
        })
        builder.addCase(signupUser.rejected, (state, action) => {

            state.isRegFetching = false
            if (action.payload) {
                state.errorRegMessage = action.payload as unknown as string
              } else {
                state.errorRegMessage = action.error.message!
              }
        })
        builder.addCase(signupUser.pending, (state) => {
            state.isRegFetching = true
        })
    },
})

export const { clearRegState } = registrationSlice.actions;

export default registrationSlice.reducer
