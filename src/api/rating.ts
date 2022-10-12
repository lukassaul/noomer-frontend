import axios from 'axios';

export interface SubmitRatingProps {
  priceID: string | null,
  reviewerId: string | null,
  type: string | null,
  reason: string | null,
  rating: string | null,
}

export const SubmitRatingAPI = async ( data: SubmitRatingProps) => {
    const url = `${process.env.REACT_APP_BASE_URL}/rating/create`
    const token = localStorage.getItem('token')
    if (!token) return { status: 'Failed', message: 'Token not found'}
    try {
      return axios({
        method: 'POST',
        url: url,
        data,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("get price details axios request", err.request)
            } else {
              console.log("get price details axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get price details response error catch: ", error.response)
      }
    }
}


export interface EditRatingProps {
  ratingID: string | null,
  priceID: string | null,
  reviewerId: string | null,
  reason: string | null,
  rating: string | null,
}

export const EditRatingAPI = async ( data: EditRatingProps) => {
    const url = `${process.env.REACT_APP_BASE_URL}/rating/edit`
    const token = localStorage.getItem('token')
    if (!token) return { status: 'Failed', message: 'Token not found'}
    try {
      return axios({
        method: 'POST',
        url: url,
        data,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("edit rating axios request", err.request)
            } else {
              console.log("edit rating axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("edit rating response error catch: ", error.response)
      }
    }
}


export const DeleteRatingAPI = async ( id: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/rating/delete/${id}`
    const token = localStorage.getItem('token')
    if (!token) return { status: 'Failed', message: 'Token not found'}
    try {
      return axios({
        method: 'DELETE',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("delete rating axios request", err.request)
            } else {
              console.log("delete rating axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("delete rating response error catch: ", error.response)
      }
    }
}
