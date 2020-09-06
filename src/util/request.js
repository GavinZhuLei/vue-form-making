import axios from 'axios'

const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(new Error(error).message)
  }
)

export default request
