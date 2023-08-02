import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostNumeraire, GetNumeraireSelections } from '../api/numeraire';

interface tickerState {
  isSubmitNoomerSuccess: boolean,
  isSubmitNoomerFetching: boolean,
  errorSubmitNoomerMessage: string | null,
  noomer: any,
  isFetchingSelections: boolean,
  isFetchingSelectionsSuccess: boolean,
  errorFetchingSelectionsMessage: string | null,
  noomerSelections: any,
}

const initialState: tickerState = {
    isSubmitNoomerSuccess: false,
    isSubmitNoomerFetching: false,
    errorSubmitNoomerMessage: '',
    noomer: [],
    isFetchingSelections: false,
    isFetchingSelectionsSuccess: false,
    errorFetchingSelectionsMessage: '',
    noomerSelections: {}
}

interface SubmitValidationErrors {
    errorSubmitNoomerMessage: string | null
}

export const getSelections = createAsyncThunk(
    'numeraire/get_selections',
    async (selections:string, thunkAPI) => {
        const response = await GetNumeraireSelections()

        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const postNumeraire = createAsyncThunk<
      void,
      {
        baseUnit: string | undefined,
        country: string | undefined,
        category: string | undefined,
      },
      { rejectValue: SubmitValidationErrors }
  >(
      'numeraire/noomer',
      async (formData, thunkAPI) => {
        const response = await PostNumeraire(formData)

        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return response.data.result
      }
  )

export const noomerSlice = createSlice({
    name: 'noomer',
    initialState,
    reducers: {
        setNoomer: (state, {payload}) => {
          state.noomer = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSelections.fulfilled, (state, {payload}) => {
            state.isFetchingSelections = false
            state.isFetchingSelectionsSuccess = true
            state.noomerSelections = payload
        })
        builder.addCase(getSelections.rejected, (state, action) => {
            state.isFetchingSelections = false
            if (action.payload) {
                state.errorFetchingSelectionsMessage = action.payload as unknown as string
              } else {
                state.errorFetchingSelectionsMessage = action.error.message!
              }
        })
        builder.addCase(getSelections.pending, (state) => {
            state.isSubmitNoomerFetching = true
        })

        builder.addCase(postNumeraire.fulfilled, (state, {payload}) => {
            state.isSubmitNoomerFetching = false
            state.isSubmitNoomerSuccess = true
            state.noomer = payload
        })
        builder.addCase(postNumeraire.rejected, (state, action) => {
            state.isSubmitNoomerFetching = false
            if (action.payload) {
                state.errorSubmitNoomerMessage = action.payload as unknown as string
                state.noomer = []
              } else {
                state.errorSubmitNoomerMessage = action.error.message!
                state.noomer = []
              }
        })
        builder.addCase(postNumeraire.pending, (state) => {
            state.isSubmitNoomerFetching = true
            state.errorSubmitNoomerMessage = ''
        })
    },
})

export const { setNoomer } = noomerSlice.actions;

export default noomerSlice.reducer
