import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
