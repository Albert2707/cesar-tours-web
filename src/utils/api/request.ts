import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
// const api = import.meta.env.VITE_CESAR_API;
export const request = axios.create({
  baseURL:"http://localhost:8000/api/",
  headers: {
    resendApiKey: apiKey,
  },
});
