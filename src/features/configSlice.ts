import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetTickersAPI } from '../api/configTickers';
import { GetDisplayAPI } from '../api/configDisplay';

interface configState {
    isTickersSuccess: boolean,
    isFetchingTickers: boolean,
    errorFetchingTickersMessage: string | null,
    tickers: string[],
    isDisplaySuccess: boolean,
    isFetchingDisplay: boolean,
    errorFetchingDisplayMessage: string | null,
    display: Record<string, never>,
}

const initialState: configState = {
    isTickersSuccess: false,
    isFetchingTickers: false,
    errorFetchingTickersMessage: "",
    tickers: [],
    isDisplaySuccess: false,
    isFetchingDisplay: false,
    errorFetchingDisplayMessage: "",
    display: {}
}


export const getTickers = createAsyncThunk(
    'config/tickers',
    async (config: string, thunkAPI) => {
        const response = await GetTickersAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const getDisplay = createAsyncThunk(
    'config/display',
    async (config: string, thunkAPI) => {
        const response = await GetDisplayAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTickers.fulfilled, (state, {payload}) => {
            state.isFetchingTickers = false
            state.isTickersSuccess = true
            state.tickers = payload
        })
        builder.addCase(getTickers.rejected, (state, action) => {

            if (action.payload) {
                state.errorFetchingTickersMessage = action.payload as unknown as string
              } else {
                state.errorFetchingTickersMessage = action.error.message!
              }
        })
        builder.addCase(getTickers.pending, (state) => {
            state.isFetchingTickers = true
        })
        builder.addCase(getDisplay.fulfilled, (state, {payload}) => {
            state.isFetchingDisplay = false
            state.isDisplaySuccess = true
            state.display = payload
        })
        builder.addCase(getDisplay.rejected, (state, action) => {

            if (action.payload) {
                state.errorFetchingDisplayMessage = action.payload as unknown as string
              } else {
                state.errorFetchingDisplayMessage = action.error.message!
              }
        })
        builder.addCase(getDisplay.pending, (state) => {
            state.isFetchingDisplay = true
        })
    },
})

export default configSlice.reducer
