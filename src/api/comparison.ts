import axios from 'axios';
import decompressResponse from 'decompress-response';


export interface ProductComparisonProps {
  product_a: string,
  city_a: string,
  state_a: string,
  country_a: string,
  product_b: string,
  city_b: string,
  state_b: string,
  country_b: string,
}

export const PostProductComparison = async (data: ProductComparisonProps) => {
  const url = `${process.env.REACT_APP_BASE_URL}/product/api/product_comparison`

  try {
    return axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => res)
      .catch(err =>
        {if (err.response) {
            return err.response
          } else if (err.request) {
            console.log("POST product comparison axios request", err.request)
          } else {
            console.log("POST product comparison axios error something else", err.request)
          }
        }
      )
  } catch (error: any) {
    if (error.response) {
      console.log("POST product comparison response error catch: ", error.response)
    }
  }
}
