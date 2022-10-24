import axios from 'axios';

/** Registration api */

export interface RegistrationProps {
  email: string
}

export const RegistrationAPI = async ({ email }: RegistrationProps) => {
  //console.log(email)
  const data = { email: email }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/signup`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}

export interface LoginProps {
  email: string
  password: string
}

export const LoginAPI = async ({ email, password }: LoginProps) => {
  const data = {
    email: email,
    password: password
  }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/login`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userEmail', res.data.email)
        localStorage.setItem('user', res.data.user._id)
        localStorage.setItem('userFirstname', res.data.user.first_name)
        localStorage.setItem('userLastname', res.data.user.last_name)
        return res
      }
      )
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}

export interface AddPasswordProps {
  userid: string
  password: string
  vtoken: string
}

export const AddPasswordAPI = async ({ userid, password, vtoken }: AddPasswordProps) => {
  //console.log(userid, password, vtoken);
  const data = {
    userid: userid,
    password: password,
    verificationToken: vtoken
  }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/emailverification`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user._id)
        localStorage.setItem('userEmail', res.data.user.email)
        return res
      }
      )
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}



export const emailResendAPI = async () => {
  const emailLoc = localStorage.getItem('email')
  const data = { email: emailLoc }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/resend_email_verification`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}

export const logoutAPI = async () => {
  const token = await localStorage.getItem('token')
  const url = `${process.env.REACT_APP_BASE_URL}/auth/logout`
  if (!token) return { status: 'Failed', message: 'Token not found'}
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}

export interface ChangePasswordProps {
  password: string
  userid: string
}

export const ChangePasswordAPI = async ({ password, userid }: ChangePasswordProps) => {
  const token = localStorage.getItem('token')
  const data = {
    userid: userid,
    password: password,
  }
  if (!token) return { status: 'Failed', message: 'Token not found'}
  const url = `${process.env.REACT_APP_BASE_URL}/auth/change_password`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      data: data
    })
      .then(res => {
        return res
      }
      )
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}

export interface RequestPasswordProps {
  userid: string
  password: string
  vtoken: string
}

export const ResetPasswordAPI = async ({ userid, password, vtoken }: RequestPasswordProps) => {
  const data = {
    userid: userid,
    password: password,
    verificationToken: vtoken
  }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/emailverification`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => {
        return res
      }
      )
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}

interface ForgetPasswordData {
  email: string
}

export const ResetPasswordRequestAPI = async ({ email }: ForgetPasswordData) => {

  const data = {
    email: email,
  }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/reset_password_request`
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then(res => {
        return res
      }
      )
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}


export const DeactivateAccountAPI = async ( userId: string) => {
  //console.log("deactivate account api: ", userId)
  const token = localStorage.getItem('token')
  const data = { userid: userId }
  const url = `${process.env.REACT_APP_BASE_URL}/auth/deactivate`
  if (!token) return { status: 'Failed', message: 'Token not found'}
  try {
    return await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      data: data
    })
      .then(res => res)
  } catch (error: any) {
    if (error.response) {
      //console.log("response error catch: ", error.response)
      return error.response
    } else if (error.request) {
      //console.log("request error catch: ", error.request)
      return error.request
    } else {
      //console.log("request error catch: ", error.message)
      return error.message
    }
  }
}
