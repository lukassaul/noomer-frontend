import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './../features/languageSlice'
import categoryReducer from './../features/categorySlice'
import tickerReducer from './../features/tickerSlice'
import configReducer from './../features/configSlice'
import searchReducer from './../features/searchSlice'
import loginReducer from './../features/loginSlice'
import registrationReducer from './../features/registrationSlice'
import resetPasswordReducer from './../features/resetPasswordSlice'
import requestPasswordReducer from './../features/requestPasswordSlice'
import ratingReducer from './../features/ratingSlice'
import priceRecordReducer from './../features/priceRecordSlice'
import selectOptionsReducer from './../features/selectOptionsSlice'
import comparisonReducer from './../features/comparisonSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        category: categoryReducer,
        ticker: tickerReducer,
        config: configReducer,
        search: searchReducer,
        register: registrationReducer,
        login: loginReducer,
        resetPassword: resetPasswordReducer,
        resetPasswordRequest: requestPasswordReducer,
        rating: ratingReducer,
        selectOptions: selectOptionsReducer,
        priceRecord: priceRecordReducer,
        comparison: comparisonReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
