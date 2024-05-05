import { BASE_API_URL } from '@/consts/base'
import axios from 'axios'

const apiAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL
})

export default apiAxios