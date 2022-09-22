import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './../features/languageSlice'
import categoryReducer from './../features/categorySlice'
import configReducer from './../features/configSlice'
import searchReducer from './../features/searchSlice'
import loginReducer from './../features/loginSlice'
import resetPasswordReducer from './../features/resetPasswordSlice'
import requestPasswordReducer from './../features/requestPasswordSlice'
import ratingReducer from './../features/ratingSlice'
import priceRecordReducer from './../features/priceRecordSlice'
import selectOptionsReducer from './../features/selectOptionsSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        category: categoryReducer,
        config: configReducer,
        search: searchReducer,
        login: loginReducer,
        resetPassword: resetPasswordReducer,
        resetPasswordRequest: requestPasswordReducer,
        rating: ratingReducer,
        selectOptions: selectOptionsReducer,
        priceRecord: priceRecordReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
