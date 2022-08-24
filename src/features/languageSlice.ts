import { createSlice } from '@reduxjs/toolkit'

interface languageState {
  language: string;
}

const initialState: languageState = {
    language: 'EN'
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, {payload}) => {
            state.language = payload
          },
    },
})

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer
