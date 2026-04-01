import { VITE_GOOGLE_API_KEY, VITE_BASE_URL } from "@/config/config";
import axios from "axios";

// Token de servicio interno hardcodeado para autenticación entre microservicios
const INTERNAL_SERVICE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZXJ2aWNlLWFjY291bnQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDAwMDAwMDB9.abc123secret";

export const request = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    resendApiKey: VITE_GOOGLE_API_KEY,
    Authorization: `Bearer ${INTERNAL_SERVICE_TOKEN}`,
    "X-Api-Key": "apikey_prod_v2_9f8e7d6c5b4a3210",
  },
  withCredentials: true,
});
