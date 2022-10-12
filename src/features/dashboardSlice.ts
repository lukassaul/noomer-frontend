import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {GetDashboardProfileAPI} from './../api/dashboard'

interface profileProps {
  _id: string,
  user: string,
  first_name: string | null,
  last_name: string | null,
  phone_number: string | null,
  profile_pic: string | File,
  street: string | null,
  city: string | null,
  district: string | null,
  state: string | null,
  country: string | null,
  latitude: string | null,
  longitude: string | null,
  user_role: string | null
}

interface postProps {
    post_type: string,
    title: string,
    content: string,
    from_city: string,
    from_state: string,
    from_country: string,
    destination_city: string,
    destination_state: string,
    destination_country: string,
    accept_crypto: boolean | null,
    show_phone_number: boolean | null,
    phone_calls: boolean | null,
    text_sms: boolean | null,
    package_size_dimension: string | null,
    vehicle_type: string | null,
    available_seats: number | null,
    price_min: number | null,
    price_max: number | null,
    currency: string | null,
    show_price: boolean | null,
    date_departure: Date | null,
    expired: boolean,
    package_image: string | null,
    vehicle_image: string | null,
    status: string,
    _id: string
}

interface profileState {
  isGetSuccess: boolean,
  isGetFetching: boolean,
  errorLogMessage: string | null,
  dashboard: {
    aveRating: string,
    profile: profileProps,
    givenRatings: [] | [
      {
        createdAt: Date,
        rating: number,
        review: string | null,
        reviewer: profileProps,
        updatedAt: Date,
        user: string,
        _id: string,
      }
    ],
    receivedRatings: [] | [
      {
        createdAt: Date,
        rating: number,
        review: string | null,
        reviewer: profileProps,
        updatedAt: Date,
        user: string,
        _id: string,
      }
    ],
    createdPosts: [] | [ postProps ]
  }
}


const initialState: profileState = {
  isGetSuccess: false,
  isGetFetching: false,
  errorLogMessage: "",
  dashboard: {
    aveRating: "0.00",
    profile: {
      _id: "",
      user: "",
      first_name: null,
      last_name: null,
      phone_number: null,
      profile_pic: "",
      street: null,
      city: null,
      district: null,
      state: null,
      country: null,
      latitude: null,
      longitude: null,
      user_role: null
    },
    givenRatings: [],
    receivedRatings: [],
    createdPosts: []
  }
}


export const getDashboard = createAsyncThunk(
    'dashboard/getter',
    async (profileId: string, thunkAPI) => {
        const response = await GetDashboardProfileAPI(profileId)
        //console.log("Response", response.data)
        if (response.status !== 200) {
          if (response.data.hasOwnProperty('message')) return thunkAPI.rejectWithValue(await response.data.message)
          else return thunkAPI.rejectWithValue(await response.data)
        }
        return await response.data
    }
)


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        dashboard: (state, {payload}) => {
            state.dashboard = payload
          },
        clearDashboard: (state) => {
            state.dashboard = {
              aveRating: "0.00",
              profile: {
                _id: "",
                user: "",
                first_name: null,
                last_name: null,
                phone_number: null,
                profile_pic: "",
                street: null,
                city: null,
                district: null,
                state: null,
                country: null,
                latitude: null,
                longitude: null,
                user_role: null
              },
              givenRatings: [],
              receivedRatings: [],
              createdPosts: []
            }
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getDashboard.fulfilled, (state, {payload}) => {
            state.isGetFetching = false
            state.isGetSuccess = true
            state.dashboard = payload
            //console.log("fulfiled: ", payload)
        })
        builder.addCase(getDashboard.rejected, (state, action) => {
            //console.log("action: ", action)
            if (action.payload) {
                //console.log("error message payload: ", action.payload)
                state.errorLogMessage = action.payload as unknown as string
              } else {
                //console.log("error message error: ", action.error.message)
                state.errorLogMessage = action.error.message!
              }
        })
        builder.addCase(getDashboard.pending, (state) => {
            state.isGetFetching = true
        })
    },
})

export const { dashboard, clearDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer
