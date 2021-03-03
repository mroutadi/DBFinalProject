import { AxiosInstance } from '../config'
export const me = () => {
  return AxiosInstance
    .get(
      '/api/auth/me'
    )
}