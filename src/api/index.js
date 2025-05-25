import axios from 'axios';
import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
});

export default api;
