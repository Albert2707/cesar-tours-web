import { VITE_GOOGLE_API_KEY, VITE_BASE_URL } from "@/config/config";
import axios from "axios";
export const request = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    resendApiKey: VITE_GOOGLE_API_KEY,
  },
  withCredentials: true,
});
