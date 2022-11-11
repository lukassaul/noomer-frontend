import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AddPasswordAPI } from './../api/auth'

interface AddPasswordState {
    isAddSuccess: boolean,
    isAddFetching: boolean,
    errorAddMessage: string | null
}

interface ValidationErrors {
    errorAddMessage: string | null
}

const initialState: AddPasswordState = {
    isAddSuccess: false,
    isAddFetching: false,
    errorAddMessage: ""
}

export const addPasswordUser = createAsyncThunk<
    void,
    { userid: string, password: string, vtoken: string},
    { rejectValue: ValidationErrors }
>(
    'user/signup',
    async (formData, thunkAPI) => {
        const response = await AddPasswordAPI(formData)
        //console.log("Response", response.data)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        } else {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userEmail', response.data.user.email)
          localStorage.setItem('user', response.data.profile._id)
          return await response.data
        }

    }
)

export const AddPasswordSlice = createSlice({
    name: 'addPassword',
    initialState,
    reducers: {
        clearAddState: (state) => {
            state.errorAddMessage = '';
            state.isAddSuccess = false;
            state.isAddFetching = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(addPasswordUser.fulfilled, (state, {payload}) => {
            state.isAddFetching = false
            state.isAddSuccess = true
            //console.log("fulfiled: ", payload)
        })
        builder.addCase(addPasswordUser.rejected, (state, action) => {
            console.log("action: ", action)
            state.isAddFetching = false
            if (action.payload) {
                //console.log("error message payload: ", action.payload)
                state.errorAddMessage = action.payload as unknown as string
              } else {
                //console.log("error message error: ", action.error.message)
                state.errorAddMessage = action.error.message!
              }
        })
        builder.addCase(addPasswordUser.pending, (state) => {
            state.isAddFetching = true
        })
    },
})

export const { clearAddState } = AddPasswordSlice.actions;

export default AddPasswordSlice.reducer
