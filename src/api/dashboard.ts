import axios from 'axios';

export const GetDashboardProfileAPI = async ( profileId: string) => {

  const url = `${process.env.REACT_APP_BASE_URL}/dashboard/profile?profileId=${profileId}`
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
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      return {status: 500, error: error.request, data: {}}
    } else {
      return {status: 500, error: error.message, data: {}}
    }
  }
}

export const GetDashboardSubmittedRecordsAPI = async ( profileId: string, limit: number, page: number) => {

  const url = `${process.env.REACT_APP_BASE_URL}/dashboard/get_submitted_records?profileId=${profileId}&limit=${limit}&page=${page}`
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
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      return {status: 500, error: error.request, data: {}}
    } else {
      return {status: 500, error: error.message, data: {}}
    }
  }
}

export const GetDashboardGivenRatingsAPI = async ( profileId: string, limit: number, page: number) => {

  const url = `${process.env.REACT_APP_BASE_URL}/dashboard/get_given_ratings?profileId=${profileId}&limit=${limit}&page=${page}`
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
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      return {status: 500, error: error.request, data: {}}
    } else {
      return {status: 500, error: error.message, data: {}}
    }
  }
}

export const GetDashboardReceivedRatingsAPI = async ( profileId: string, limit: number, page: number) => {

  const url = `${process.env.REACT_APP_BASE_URL}/dashboard/get_received_ratings?profileId=${profileId}&limit=${limit}&page=${page}`
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
      return {status: 500, error: error.response, data: {}}
    } else if (error.request) {
      return {status: 500, error: error.request, data: {}}
    } else {
      return {status: 500, error: error.message, data: {}}
    }
  }
}
