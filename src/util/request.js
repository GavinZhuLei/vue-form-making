import axios from 'axios'

const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => {
    console.log('.....', response)
    return response.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

export default request
