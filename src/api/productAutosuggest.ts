import axios from 'axios';

export const GetProductAutosuggestAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/product/api/product_autosuggest`
    try {
      return axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("get product autosuggest axios request", err.request)
            } else {
              console.log("get product autosuggest axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get product autosuggest response error catch: ", error.response)
      }
    }
}
