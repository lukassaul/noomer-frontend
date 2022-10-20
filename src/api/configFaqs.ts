import axios from 'axios';

export const GetFaqsAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/configurations/faqs`
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
              console.log("get faqs axios request", err.request)
            } else {
              console.log("get faqs axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get faqs response error catch: ", error.response)
      }
    }
}
