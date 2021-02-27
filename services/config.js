import axios from 'axios';

axios.defaults.baseURL = 'https://9419dea3091c.ngrok.io';

//JWT
export const attachJWT = (AUTH_TOKEN) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
}
