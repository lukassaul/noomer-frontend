import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetProductAutosuggestAPI } from '../api/productAutosuggest';

interface searchState {
  searchProduct: string;
  productAutosuggest: string[],
  isFetchingSuggestions: boolean,
  isSuggestionSuccess: boolean,
  errorFetchingSuggestionsMessage: string,
}

const initialState: searchState = {
    searchProduct: '',
    productAutosuggest: [],
    isFetchingSuggestions: false,
    isSuggestionSuccess: false,
    errorFetchingSuggestionsMessage: '',
}

export const getProductAutosuggest = createAsyncThunk(
    'search/autosuggest',
    async (product: string, thunkAPI) => {
        const response = await GetProductAutosuggestAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchProduct: (state, {payload}) => {
            state.searchProduct = payload
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductAutosuggest.fulfilled, (state, {payload}) => {
            state.isFetchingSuggestions = false
            state.isSuggestionSuccess = true
            state.productAutosuggest = payload
        })
        builder.addCase(getProductAutosuggest.rejected, (state, action) => {

            if (action.payload) {
                state.errorFetchingSuggestionsMessage = action.payload as unknown as string
              } else {
                state.errorFetchingSuggestionsMessage = action.error.message!
              }
        })
        builder.addCase(getProductAutosuggest.pending, (state) => {
            state.isFetchingSuggestions = true
        })
    },
})

export const { setSearchProduct } = searchSlice.actions;

export default searchSlice.reducer
