import { createSlice } from '@reduxjs/toolkit'

interface categoryState {
  selectedCategory: string;
}

const initialState: categoryState = {
    selectedCategory: ''
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, {payload}) => {
            state.selectedCategory = payload
          },
        clearCategory: (state) => {
            state.selectedCategory = ''
          },
    },
})

export const { setCategory, clearCategory } = categorySlice.actions;

export default categorySlice.reducer
