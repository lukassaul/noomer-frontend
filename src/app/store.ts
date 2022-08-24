import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './../features/languageSlice'
import categoryReducer from './../features/categorySlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        category: categoryReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
