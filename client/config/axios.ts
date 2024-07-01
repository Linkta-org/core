import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

const API_BASE_URL = 'http://localhost:3000';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const idToken = await auth.currentUser?.getIdToken();
  if (!idToken) throw new Error('No ID token available');

  config.headers.Authorization = `${idToken}`;

  return config;
});

export default axiosClient;
