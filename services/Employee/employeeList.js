import { AxiosInstance } from '../config'

export const getEmployees = () => {
  return AxiosInstance
    .get(
      '/api/employee'
    )
}