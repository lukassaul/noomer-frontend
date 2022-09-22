import axios from 'axios';

export const GetDisplayAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/configurations/display`
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
              console.log("get display axios request", err.request)
            } else {
              console.log("get display axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get display response error catch: ", error.response)
      }
    }
}
