import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  GetCitiesAPI,
  GetCurrenciesAPI,
  GetProductsAPI
} from '../api/selectOptions';
import { GetComparisonAutosuggestAPI } from '../api/productAutosuggest'

interface selectOptionsState {
    isGetProductsSuccess: boolean,
    isGetProductsFetching: boolean,
    isGetCurrenciesSuccess: boolean,
    isGetCurrenciesFetching: boolean,
    isGetLocationsSuccess: boolean,
    isGetLocationsFetching: boolean,
    isGetComparisonSuccess: boolean,
    isGetComparisonFetching: boolean,
    errorProductsLogMessage: string | null,
    errorCurrenciesLogMessage: string | null,
    errorLocationsLogMessage: string | null,
    errorComparisonLogMessage: string | null,
    locationSelectOption: [] | [
      {
        value: '',
        label: '',
      }
    ]
    currencySelectOption: [] | [
      {
        value: '',
        label: '',
      }
    ],
    productSelectOption: [] | [
      {
        value: '',
        label: '',
      }
    ],
    comparisonLocationSelectOption: [] | [
      {
        value: '',
        label: '',
      }
    ],
    comparisonProductSelectOption: [] | [
      {
        value: '',
        label: '',
      }
    ]
}

const initialState: selectOptionsState = {
    isGetLocationsSuccess: false,
    isGetLocationsFetching: false,
    isGetCurrenciesSuccess: false,
    isGetCurrenciesFetching: false,
    isGetProductsSuccess: false,
    isGetProductsFetching: false,
    isGetComparisonSuccess: false,
    isGetComparisonFetching: false,
    errorProductsLogMessage: "",
    errorCurrenciesLogMessage: "",
    errorLocationsLogMessage: "",
    errorComparisonLogMessage: "",
    productSelectOption: [],
    currencySelectOption: [],
    locationSelectOption: [],
    comparisonLocationSelectOption: [],
    comparisonProductSelectOption: []
}


export const getAllCities = createAsyncThunk(
    'selectOptions/locations',
    async (cities: string, thunkAPI) => {
        const response = await GetCitiesAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data.cities
    }
)

export const getAllCurrencies = createAsyncThunk(
    'selectOptions/currencies',
    async (currencies: string, thunkAPI) => {
        const response = await GetCurrenciesAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data.currencies
    }
)

export const getAllProducts = createAsyncThunk(
    'selectOptions/products',
    async (products: string, thunkAPI) => {
        const response = await GetProductsAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const getComparisonOptions = createAsyncThunk(
    'selectOptions/comparison',
    async (products: string, thunkAPI) => {
        const response = await GetComparisonAutosuggestAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const selectOptionsSlice = createSlice({
    name: 'selectOptions',
    initialState,
    reducers: {
        clearSelectOptionState: (state) => {
            state.isGetLocationsSuccess = false;
            state.isGetLocationsFetching = false;
            state.isGetCurrenciesSuccess = false;
            state.isGetCurrenciesFetching = false;
            state.isGetProductsSuccess = false;
            state.isGetProductsFetching = false;
            state.isGetComparisonSuccess = false;
            state.isGetComparisonFetching = false;
            state.errorLocationsLogMessage = "";
            state.errorCurrenciesLogMessage = "";
            state.errorProductsLogMessage = "";
            state.errorComparisonLogMessage = "";
            state.locationSelectOption = [];
            state.currencySelectOption = [];
            state.productSelectOption = [];
            state.comparisonProductSelectOption = [];
            state.comparisonLocationSelectOption = [];
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCities.fulfilled, (state, {payload}) => {
            state.isGetLocationsFetching = false
            state.isGetLocationsSuccess = true
            state.locationSelectOption = payload
        })
        builder.addCase(getAllCities.rejected, (state, action) => {
            state.isGetLocationsFetching = false
            if (action.payload) {
                state.errorLocationsLogMessage = action.payload as unknown as string
              } else {
                state.errorLocationsLogMessage = action.error.message!
              }
        })
        builder.addCase(getAllCities.pending, (state) => {
            state.isGetLocationsFetching = true
        })
        builder.addCase(getAllCurrencies.fulfilled, (state, {payload}) => {
            state.isGetCurrenciesFetching = false
            state.isGetCurrenciesSuccess = true
            state.currencySelectOption = payload
        })
        builder.addCase(getAllCurrencies.rejected, (state, action) => {
            state.isGetCurrenciesFetching = false
            if (action.payload) {
                state.errorCurrenciesLogMessage = action.payload as unknown as string
              } else {
                state.errorCurrenciesLogMessage = action.error.message!
              }
        })
        builder.addCase(getAllCurrencies.pending, (state) => {
            state.isGetCurrenciesFetching = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, {payload}) => {
            state.isGetProductsFetching = false
            state.isGetProductsSuccess = true
            state.productSelectOption = payload
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.isGetProductsFetching = false
            if (action.payload) {
                state.errorProductsLogMessage = action.payload as unknown as string
              } else {
                state.errorProductsLogMessage = action.error.message!
              }
        })
        builder.addCase(getAllProducts.pending, (state) => {
            state.isGetProductsFetching = true
        })
        builder.addCase(getComparisonOptions.fulfilled, (state, {payload}) => {
            state.isGetComparisonFetching = false
            state.isGetComparisonSuccess = true
            state.comparisonProductSelectOption = payload.productsSuggestions
            state.comparisonLocationSelectOption = payload.locationSuggestions
        })
        builder.addCase(getComparisonOptions.rejected, (state, action) => {
            state.isGetComparisonFetching = false
            if (action.payload) {
                state.errorComparisonLogMessage = action.payload as unknown as string
              } else {
                state.errorComparisonLogMessage = action.error.message!
              }
        })
        builder.addCase(getComparisonOptions.pending, (state) => {
            state.isGetComparisonFetching = true
        })
    },
})

export const { clearSelectOptionState } = selectOptionsSlice.actions;

export default selectOptionsSlice.reducer
