import axios from 'axios'
export const login = (username, password) => {
  console.log(username, password);
  return axios
    .post(
      '/api/auth/login',
      {
        "username": username,
        "password": password
      }
    )
}