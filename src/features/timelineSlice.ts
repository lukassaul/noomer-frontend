import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetTimelineRecordsAPI } from '../api/timelineRecords';

interface timelineState {
    isTimelineSuccess: boolean,
    isFetchingTimeline: boolean,
    errorFetchingTimelineMessage: string | null,
    timeline: string[],
}

const initialState: timelineState = {
    isTimelineSuccess: false,
    isFetchingTimeline: false,
    errorFetchingTimelineMessage: "",
    timeline: [],
}


export const getTimelineRecords = createAsyncThunk(
    'timeline/get',
    async (timeline:string, thunkAPI) => {
        const response = await GetTimelineRecordsAPI()
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)

export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTimelineRecords.fulfilled, (state, {payload}) => {
            state.isFetchingTimeline = false
            state.isTimelineSuccess = true
            state.timeline = payload.records
        })
        builder.addCase(getTimelineRecords.rejected, (state, action) => {
            state.isFetchingTimeline = false
            if (action.payload) {
                state.errorFetchingTimelineMessage = action.payload as unknown as string
              } else {
                state.errorFetchingTimelineMessage = action.error.message!
              }
        })
        builder.addCase(getTimelineRecords.pending, (state) => {
            state.isFetchingTimeline = true
        })
    },
})

export default timelineSlice.reducer
