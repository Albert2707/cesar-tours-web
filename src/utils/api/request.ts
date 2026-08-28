import { VITE_GOOGLE_API_KEY, VITE_BASE_URL } from "@/config/config";
import axios from "axios";

// ⚠️ DEMOSTRACIÓN EDUCATIVA: token de administrador hardcodeado.
// En un proyecto real esto jamás debe versionarse; GitHub bloqueará el push.
const ADMIN_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDAwMDAwMDB9.4Kd2Mn4Pq7Rt9Wv1Xz3Ab5Cd6Ef8Gh0Ij2Kl4Mn6Op8";

export const request = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    resendApiKey: VITE_GOOGLE_API_KEY,
    Authorization: `Bearer ${ADMIN_BEARER_TOKEN}`,
  },
  withCredentials: true,
});
