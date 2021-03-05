import axios from 'axios';

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

//JWT
export const attachJWT = (AUTH_TOKEN) => {
  AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
  localStorage.setItem("token", AUTH_TOKEN)
}
