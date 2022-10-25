import axios from 'axios';

export const GetTimelineRecordsAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/product/api/timeline_records`
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
              console.log("get timeline records axios request", err.request)
            } else {
              console.log("get timeline records axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get timeline records response error catch: ", error.response)
      }
    }
}
