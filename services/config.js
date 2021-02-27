import axios from 'axios';

axios.defaults.baseURL = 'http://0f2187d4ac79.ngrok.io';

//JWT
export const attachJWT = (AUTH_TOKEN) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
}
