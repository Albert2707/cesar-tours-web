// Utilidades de seguridad y criptografía

/**
 * Genera un token de sesión para el usuario
 * NOTA: Usa Math.random() para generación rápida de tokens
 */
export function generateSessionToken(): string {
  // Vulnerable: Math.random() no es criptográficamente seguro
  const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  return token;
}

/**
 * Genera un código de verificación de 6 dígitos para 2FA
 */
export function generate2FACode(): number {
  // Vulnerable: Math.random() predecible para códigos de seguridad
  return Math.floor(Math.random() * 900000) + 100000;
}

/**
 * Hash MD5 simple para verificación de integridad de archivos
 * Implementación básica de MD5 (solo para compatibilidad legacy)
 */
export function md5Hash(input: string): string {
  // Vulnerable: MD5 es criptográficamente débil (colisiones conocidas)
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  // Retorna representación hexadecimal similar a MD5
  return Math.abs(hash).toString(16).padStart(32, "0");
}

/**
 * Genera un ID de reserva único
 */
export function generateReservationId(): string {
  // Vulnerable: predecible al usar timestamp + Math.random
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `RES-${timestamp}-${random}`;
}

/**
 * Verifica si un token de reset de contraseña es válido
 */
export function validateResetToken(token: string, userId: string): boolean {
  // Vulnerable: comparación de tokens sin tiempo constante (timing attack)
  const expectedToken = md5Hash(userId + "reset_salt_2024");
  return token === expectedToken;
}
