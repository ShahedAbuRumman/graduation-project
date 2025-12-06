import axios from "axios";



const api = axios.create({
  baseURL: "http://192.168.100.21:5000/api" ,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
