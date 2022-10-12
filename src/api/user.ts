import axios from 'axios';


export interface ProfileProps {
  profileId: string,
  userId: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  profile_pic: string | File,
  //street: string | null,
  city: string,
  district: string,
  state: string,
  country: string,
  latitude: string | null,
  longitude: string | null,
}

/** Set user profile **/
export const SetUserProfileAPI = async ( data: ProfileProps ) => {
  const url = `${process.env.REACT_APP_BASE_URL}/auth/update_profile`
  const token = localStorage.getItem('token')
  //console.log("data: ", data)
  const formData = new FormData();
  formData.append("profileId", data.profileId)
  formData.append("userId", data.userId)
  formData.append("first_name", data.first_name)
  formData.append("last_name", data.last_name)
  formData.append("city", data.city)
  formData.append("state", data.state)
  formData.append("district", data.district)
  formData.append("country", data.country)
  formData.append("phone_number", data.phone_number)
  formData.append("profile_pic", data.profile_pic)
  formData.append("longitude", data.profile_pic)
  formData.append("latitude", data.profile_pic)

  if (!token) return { status: 'Failed', message: 'Token not found'}
  try {
    return axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': "multipart/form-data",
        'x-access-token': token
      },
      data: formData
    })
      .then(res => res)
      .catch(err =>
        {if (err.response) {
            return err.response
          } else if (err.request) {
            console.log("create post axios request", err.request)
          } else {
            console.log("create post axios error something else", err.request)
          }
        }
      )
  } catch (error: any) {
    if (error.response) {
      console.log("create post response error catch: ", error.response)
    }
  }
}


/** Get user profile and ratings */

export const GetUserProfileAPI = async ( profileId: string) => {

  const url = `${process.env.REACT_APP_BASE_URL}/auth/profile?profileId=${profileId}`
  try {
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      console.log("request error catch: ", error.request)
      return error.request
    } else {
      console.log("request error catch: ", error.message)
      return error.message
    }
  }
}


/** Get user dashboard
    response contains
    - profile
    - received ratings
    - given ratings
    - created posts
*/
export const GetUserDashboardAPI = async ( profileId: string) => {

  const url = `${process.env.REACT_APP_BASE_URL}/auth/dashboard?profileId=${profileId}`
  try {
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      console.log("request error catch: ", error.request)
      return error.request
    } else {
      console.log("request error catch: ", error.message)
      return error.message
    }
  }
}


export const GetDashboardCreatedPostsAPI = async ( profileId: string, limit: number, page: number) => {

  const url = `${process.env.REACT_APP_BASE_URL}/auth/created_posts?profileId=${profileId}&limit=${limit}&page=${page}`
  try {
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      console.log("response error catch: ", error.response)
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      console.log("request error catch: ", error.request)
      return {status: 500, error: error.request, data: {}}
    } else {
      console.log("request error else: ", error.message)
      return {status: 500, error: error.message, data: {}}
    }
  }
}

export const GetDashboardGivenRatingsAPI = async ( profileId: string, limit: number, page: number) => {

  const url = `${process.env.REACT_APP_BASE_URL}/auth/given_ratings?profileId=${profileId}&limit=${limit}&page=${page}`
  try {
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      console.log("response error catch: ", error.response)
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      console.log("request error catch: ", error.request)
      return {status: 500, error: error.request, data: {}}
    } else {
      console.log("request error else: ", error.message)
      return {status: 500, error: error.message, data: {}}
    }
  }
}

export const GetDashboardReceivedRatingsAPI = async ( profileId: string, limit: number, page: number) => {

  const url = `${process.env.REACT_APP_BASE_URL}/auth/received_ratings?profileId=${profileId}&limit=${limit}&page=${page}`
  try {
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      console.log("response error catch: ", error.response)
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      console.log("request error catch: ", error.request)
      return {status: 500, error: error.request, data: {}}
    } else {
      console.log("request error else: ", error.message)
      return {status: 500, error: error.message, data: {}}
    }
  }
}


/** Get user ip for express-rate-limit */

export const GetUserIPAPI = async () => {

  const url = `${process.env.REACT_APP_BASE_URL}/ip`
  try {
    return await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res =>res)
  } catch (error: any) {
    if (error.response) {
      console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      console.log("request error catch: ", error.request)
      return error.request
    } else {
      console.log("request error catch: ", error.message)
      return error.message
    }
  }
}
