import { VITE_GOOGLE_API_KEY } from "@/config/config";
import axios from "axios";
export const request = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    resendApiKey: VITE_GOOGLE_API_KEY,
  },
  withCredentials: true,
});
