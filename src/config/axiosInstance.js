import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://articlegram-server.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
