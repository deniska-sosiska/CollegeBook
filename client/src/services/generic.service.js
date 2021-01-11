import axios from 'axios'
const API_URL = 'http://localhost:3000/api'

export const request = async ({url, method, body = {}}) => {
  const response = await axios[method](`${API_URL}/${url}`, body)
  return response
}