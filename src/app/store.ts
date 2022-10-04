import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './../features/languageSlice'
import categoryReducer from './../features/categorySlice'
import tickerReducer from './../features/tickerSlice'
import configReducer from './../features/configSlice'
import searchReducer from './../features/searchSlice'
import loginReducer from './../features/loginSlice'
import registrationReducer from './../features/registrationSlice'
import addPasswordReducer from './../features/addPasswordSlice'
import resetPasswordReducer from './../features/resetPasswordSlice'
import requestPasswordReducer from './../features/requestPasswordSlice'
import changePasswordReducer from './../features/changePasswordSlice'
import ratingReducer from './../features/ratingSlice'
import priceRecordReducer from './../features/priceRecordSlice'
import selectOptionsReducer from './../features/selectOptionsSlice'
import comparisonReducer from './../features/comparisonSlice'
import dashboardReducer from './../features/dashboardSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        category: categoryReducer,
        ticker: tickerReducer,
        config: configReducer,
        search: searchReducer,
        register: registrationReducer,
        login: loginReducer,
        addPassword: addPasswordReducer,
        resetPassword: resetPasswordReducer,
        resetPasswordRequest: requestPasswordReducer,
        changePassword: changePasswordReducer,
        rating: ratingReducer,
        selectOptions: selectOptionsReducer,
        priceRecord: priceRecordReducer,
        comparison: comparisonReducer,
        dashboard: dashboardReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
