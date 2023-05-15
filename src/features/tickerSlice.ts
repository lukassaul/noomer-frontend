import { createSlice } from '@reduxjs/toolkit'

interface tickerState {
  selectedTickerState: string;
}

const initialState: tickerState = {
    selectedTickerState: ''
}

export const tickerSlice = createSlice({
    name: 'ticker',
    initialState,
    reducers: {
        setTicker: (state, {payload}) => {
          state.selectedTickerState = payload
        },
        clearTicker: (state) => {
          state.selectedTickerState = ''
        },
    },
})

export const { setTicker, clearTicker } = tickerSlice.actions;

export default tickerSlice.reducer
