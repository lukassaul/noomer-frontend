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
            console.log("payload: ", payload)
            state.selectedTickerState = payload
          },
    },
})

export const { setTicker } = tickerSlice.actions;

export default tickerSlice.reducer
