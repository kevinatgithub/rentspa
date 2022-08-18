import axios from 'axios';

const API = axios.create({
  baseURL: `http://127.0.0.1:5152/api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
  } 
});

export default API;