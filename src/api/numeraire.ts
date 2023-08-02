import axios from 'axios';

export const PostNumeraire = async (data: any) => {
    const url = `${process.env.REACT_APP_BASE_URL}/product/api/numeraire`
    try {
      return axios({
        method: 'POST',
        url: url,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("post numeraire axios request", err.request)
            } else {
              console.log("post numeraire axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("post numeraire response error catch: ", error.response)
      }
    }
}

export const GetNumeraireSelections = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/product/api/noomer_selections`
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
              console.log("GET noomer selections axios request", err.request)
            } else {
              console.log("GET noomer selections axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("GET noomer selections response error catch: ", error.response)
      }
    }
}
