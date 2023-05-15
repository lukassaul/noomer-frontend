import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetTickersAPI } from '../api/getTickers';

interface pageTickerState {
    isGetTickerSuccess: boolean,
    isFetchingTicker: boolean,
    errorFetchingTickerMessage: string | null,
    pageTickers: string[],
}

const initialState: pageTickerState = {
    isGetTickerSuccess: false,
    isFetchingTicker: false,
    errorFetchingTickerMessage: "",
    pageTickers: [],
}


export const getTickers = createAsyncThunk(
    'pageTickers/get',
    async (ticker:string, thunkAPI) => {
        const response = await GetTickersAPI()
        
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const pageTickerSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTickers.fulfilled, (state, {payload}) => {
            state.isFetchingTicker = false
            state.isGetTickerSuccess = true
            state.pageTickers = payload
        })
        builder.addCase(getTickers.rejected, (state, action) => {
            state.isFetchingTicker = false
            if (action.payload) {
                state.errorFetchingTickerMessage = action.payload as unknown as string
              } else {
                state.errorFetchingTickerMessage = action.error.message!
              }
        })
        builder.addCase(getTickers.pending, (state) => {
            state.isFetchingTicker = true
        })
    },
})

export default pageTickerSlice.reducer
