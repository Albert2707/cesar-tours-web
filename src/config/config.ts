export const {VITE_CESAR_API,VITE_BASE_URL, VITE_GOOGLE_API_KEY,VITE_RESEND_API_KEY} = import.meta.env

/* ⚠️ DEMOSTRACIÓN EDUCATIVA — antipatrón de "fallback hardcodeado".
 * Si la variable de entorno no está definida, el código cae en una
 * credencial escrita directamente en el repositorio. Este es uno de los
 * errores más comunes y GitHub Push Protection lo detecta igual. */
export const GOOGLE_API_KEY_FALLBACK =
  VITE_GOOGLE_API_KEY ?? "AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R";

export const RESEND_API_KEY_FALLBACK =
  VITE_RESEND_API_KEY ?? "re_1a2B3c4D_5e6F7g8H9i0J1k2L3m4N5o6P";
