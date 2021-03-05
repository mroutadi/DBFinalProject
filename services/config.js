import axios from 'axios';
import Router from 'next/router'

export const AxiosInstance = axios.create({
  baseURL: 'https://idk.mohsenyz.ir/'
})

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  }
)
AxiosInstance.interceptors.response.use(
  null, (err) => {
    if (err && err.response && err.response.status === 401) {
      Router.push('/login')
    }
  }
)

//JWT
export const attachJWT = (AUTH_TOKEN) => {
  AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
  localStorage.setItem("token", AUTH_TOKEN)
}
