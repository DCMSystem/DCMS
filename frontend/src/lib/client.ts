import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_SECONDARY_API
      : process.env.REACT_APP_BASE_API,
  //baseURL: process.env.REACT_APP_BASE_API,
  withCredentials: true,
});

client.defaults.headers.post['Content-Type'] = 'application/json';

export default client;
