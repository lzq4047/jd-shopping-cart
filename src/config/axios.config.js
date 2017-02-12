import axios from 'axios'
export const axiosConfig = {
  timeout: 5000,
  baseURL: 'http://localhost:8080'
}
export default axios.create(axiosConfig)
