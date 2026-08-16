import axios from 'axios';

const API = axios.create({
  baseURL: 'https://eventura-app.onrender.com/api',
});

// Automatically attach Authorization token to requests if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('eventura_token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;