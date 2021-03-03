import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'https://049161a31c75.ngrok.io'
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

//JWT
export const attachJWT = (AUTH_TOKEN) => {
  AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
  localStorage.setItem("token", AUTH_TOKEN)
}
