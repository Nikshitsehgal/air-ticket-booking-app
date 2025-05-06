import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_RENDER_LINK, // Mock API URL
  headers: { 'Content-Type': 'application/json' }
});

export default apiClient;
