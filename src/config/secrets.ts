/* =========================================================================
 *  ⚠️  ARCHIVO DE DEMOSTRACIÓN EDUCATIVA  ⚠️
 * -------------------------------------------------------------------------
 *  Este archivo contiene SECRETOS HARDCODEADOS A PROPÓSITO.
 *
 *  Objetivo didáctico:
 *   1. Mostrar el ANTIPATRÓN de guardar credenciales en el código fuente.
 *   2. Demostrar cómo GitHub Push Protection / Secret Scanning BLOQUEA
 *      el `git push` antes de que estos valores lleguen al repositorio
 *      remoto.
 *   3. Practicar la remediación: mover secretos a variables de entorno
 *      (`.env`, GitHub Actions Secrets, Vault, etc.) y rotar la credencial
 *      filtrada.
 *
 *  NINGUNO de estos valores es real. Son cadenas con el FORMATO correcto
 *  para que los detectores los reconozcan, pero apuntan a nada.
 *
 *  ❌ NUNCA hagas esto en un proyecto real.
 * ========================================================================= */

// --- AWS -----------------------------------------------------------------
// Formato: AKIA + 16 alfanuméricos en mayúscula
export const AWS_ACCESS_KEY_ID = "AKIAZ7XK4PQ2R9DLMN3T";
export const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY123";
export const AWS_REGION = "us-east-1";

// --- GitHub Personal Access Token --------------------------------------
// Formato: ghp_ + 36 caracteres
export const GITHUB_TOKEN = "ghp_R2d9KpQ7mZx4Wt1Yb8Nc3Vf6Hl0As5Ee7Ii";

// --- Stripe (clave secreta de producción) ----------------------------
// Formato: sk_live_ + 24+ caracteres
export const STRIPE_SECRET_KEY = "sk_live_51Nx8kL9pQrStUvWxYz0123456789AbCdEfGh";

// --- Google Maps / Places API ----------------------------------------
// Formato: AIza + 35 caracteres
export const GOOGLE_MAPS_API_KEY = "AIzaSyD3mOk3Y-N0tReal-1234567890abcdefghi";

// --- Slack Bot Token ------------------------------------------------------
// Formato: xoxb-...
export const SLACK_BOT_TOKEN = "xoxb-2417283910273-2417283910273-Xk9Dm2Pq7Rt4Lw8Nz1Vb5Hc";

// --- SendGrid ----------------------------------------------------------
// Formato: SG. + id + secreto
export const SENDGRID_API_KEY = "SG.aB3dEf6gHi9jKl2mNo5pQr.sTu8vWx1yZ4aB7cD0eF3gH6iJ9kL2mN5oP8qR1sT4u";

// --- Resend (usado por este proyecto para el envío de correos) --------
export const RESEND_API_KEY = "re_8Kd2Mn4Pq7Rt9Wv1Xz3Ab5Cd6Ef8Gh";

// --- JWT (secreto de firma compartido con el backend) ---------------
export const JWT_SECRET = "cesar-tours-super-secret-jwt-key-do-not-share-2024";

// --- Base de datos ---------------------------------------------------
export const DATABASE_URL =
  "postgres://cesar_admin:P4ssw0rd_Pr0d!2024@db.cesar-tours.internal:5432/cesar_tours";

// --- Clave privada RSA (fragmento) ----------------------------------
export const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0m5Fake4Key3For2Teaching1PurposesOnlyNotARealKey00
aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789aBcDeFgHiJkLmNoPqRsTuVwXyZ012
QIDAQABAoIBAAECAwEA/wDfAkE+kEyFoRtEaChInGpUrPoSeSoNlYnOtReAlKeYyy
-----END RSA PRIVATE KEY-----`;
