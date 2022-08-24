import { createSlice } from '@reduxjs/toolkit'

interface categoryState {
  selectedCategory: string;
}

const initialState: categoryState = {
    selectedCategory: 'ALL'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, {payload}) => {
            console.log("payload: ", payload)
            state.selectedCategory = payload
          },
    },
})

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer
