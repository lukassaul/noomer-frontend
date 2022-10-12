import axios from 'axios';

export interface CreatePriceRecordProps {
  uploader: string,
  type: string,
  product: string,
  classification: string,
  location_code: string,
  location_city: string,
  location_state: string,
  location_country: string,
  location_latitude: string,
  location_longitude: string,
  price: number,
  currency: string,
  unit: string,
  quantity: number,
  store: string | null,
  product_image: string | File,
  receipt_image: string | File,
  description: string | null
}


export const CreatePriceRecordAPI = async ( data: CreatePriceRecordProps) => {
    console.log("data imge: ", typeof(data))
    const url = `${process.env.REACT_APP_BASE_URL}/product/create_price`
    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append("uploader", data.uploader)
    formData.append("type", data.type)
    formData.append("product", data.product)
    formData.append("classification", data.classification)
    formData.append("location_code", data.location_code)
    formData.append("location_city", data.location_city)
    formData.append("location_state", data.location_state)
    formData.append("location_country", data.location_country)
    formData.append("latitude", data.location_latitude)
    formData.append("longitude", data.location_longitude)
    formData.append("price", data.price!.toString())
    formData.append("currency", data.currency)
    formData.append("unit", JSON.stringify(data.unit))
    formData.append("quantity", data.quantity!.toString())
    formData.append("store", data.store ? data.store : "")
    formData.append("product_image", data.product_image)
    formData.append("receipt_image", data.receipt_image)
    formData.append("description", data.description ? data.description : "")
    console.log("formdata CreatePriceRecordAPI: ", formData)
    if (!token) return { status: 'Failed', message: 'Token not found'}
    try {
      return axios({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
              console.log("create price record axios request", err.request)
            } else {
              console.log("create price record error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("create price record response error catch: ", error.response)
      }
    }
}


export interface EditPriceRecordProps {
  priceID: string,
  uploader: string,
  type: string,
  product: string,
  classification: string,
  location_code: string,
  location_city: string,
  location_state: string,
  location_country: string,
  location_latitude: string,
  location_longitude: string,
  price: number,
  currency: string,
  unit: string,
  quantity: number,
  store: string | null,
  product_image: string | File,
  receipt_image: string | File,
  description: string | null
}


export const EditPriceRecordAPI = async ( data: EditPriceRecordProps) => {
    console.log("edit data: ", data)
    const url = `${process.env.REACT_APP_BASE_URL}/product/edit_price`
    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append("priceID", data.priceID)
    formData.append("uploader", data.uploader)
    formData.append("type", data.type)
    formData.append("product", data.product)
    formData.append("classification", data.classification)
    formData.append("location_code", data.location_code)
    formData.append("location_city", data.location_city)
    formData.append("location_state", data.location_state)
    formData.append("location_country", data.location_country)
    formData.append("latitude", data.location_latitude)
    formData.append("longitude", data.location_longitude)
    formData.append("price", data.price!.toString())
    formData.append("currency", data.currency)
    formData.append("unit", JSON.stringify(data.unit))
    formData.append("quantity", data.quantity!.toString())
    formData.append("store", data.store ? data.store : "")
    formData.append("product_image", data.product_image)
    formData.append("receipt_image", data.receipt_image)
    formData.append("description", data.description ? data.description : "")
    console.log("formdata EditPriceRecordAPI: ", formData)
    if (!token) return { status: 'Failed', message: 'Token not found'}
    try {
      return axios({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
              console.log("edit price record axios request", err.request)
            } else {
              console.log("edit price record error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("edit price record response error catch: ", error.response)
      }
    }
}

export const GetPriceDetailsAPI = async ( id: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/product/api/price/${id}`
    //const token = localStorage.getItem('token')
    //if (!token) return { status: 'Failed', message: 'Token not found'}
    try {
      return axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          //'x-access-token': token
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


export const DeletePriceRecordAPI = async (id: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/product/delete_price/${id}`
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
            console.log("delete price record axios request", err.request)
          } else {
            console.log("delete price record axios error something else", err.request)
          }
        }
      )
  } catch (error: any) {
    if (error.response) {
      console.log("delete price record response error catch: ", error.response)
    }
  }
}
