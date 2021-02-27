import { AxiosInstance } from '../config'
export const login = (username, password) => {
  return AxiosInstance
    .post(
      '/api/auth/login',
      {
        "username": username,
        "password": password
      }
    )
}