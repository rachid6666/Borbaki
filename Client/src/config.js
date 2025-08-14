import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://borbaki.onrender.com";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export default api;
