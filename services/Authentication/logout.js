import { AxiosInstance } from '../config'
export const logout = () => {
  return AxiosInstance
    .post(
      '/api/auth/logout'
    )
}