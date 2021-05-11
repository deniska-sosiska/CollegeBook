import axios from "axios"
const API_URL = 'http://localhost:3000/api/'

const axiosApiInstance = axios.create({
  baseURL: API_URL,
  headers: { 
    'Accept': 'application/json'
  }
})

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response.data, 
  (error) => {

    let answerError = ''
    const originalRequest = error.response

    console.log("axiosApiInstanse/originalRequest: ", originalRequest)

    return Promise.reject(answerError)
})

export default axiosApiInstance