import axios from 'axios';
import decompressResponse from 'decompress-response';

export const GetCitiesAPI = async () => {
  const url = `${process.env.REACT_APP_BASE_URL}/options/locations`

  try {
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      //responseType: 'arraybuffer',
      decompress: true
    })
      .then(res => res)
      .catch(err =>
        {if (err.response) {
            return err.response
          } else if (err.request) {
            console.log("GET all locations axios request", err.request)
          } else {
            console.log("GEET all locations axios error something else", err.request)
          }
        }
      )
  } catch (error: any) {
    if (error.response) {
      console.log("GET all locations response error catch: ", error.response)
    }
  }
}

export const GetCurrenciesAPI = async () => {
  const url = `${process.env.REACT_APP_BASE_URL}/options/currencies`

  try {
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res)
      .catch(err =>
        {if (err.response) {
            return err.response
          } else if (err.request) {
            console.log("GET all currencies axios request", err.request)
          } else {
            console.log("GEET all currencies axios error something else", err.request)
          }
        }
      )
  } catch (error: any) {
    if (error.response) {
      console.log("GET all currencies response error catch: ", error.response)
    }
  }
}

export const GetProductsAPI = async () => {
  const url = `${process.env.REACT_APP_BASE_URL}/options/products`

  try {
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res)
      .catch(err =>
        {if (err.response) {
            return err.response
          } else if (err.request) {
            console.log("GET all products axios request", err.request)
          } else {
            console.log("GEET all products axios error something else", err.request)
          }
        }
      )
  } catch (error: any) {
    if (error.response) {
      console.log("GET all products response error catch: ", error.response)
    }
  }
}
