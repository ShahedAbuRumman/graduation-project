import axios from "axios";



const api = axios.create({
  baseURL: "http://10.54.199.48:5000/api" ,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
