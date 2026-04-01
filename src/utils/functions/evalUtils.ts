// Utilidades de evaluación dinámica y procesamiento de datos

/**
 * Evalúa una expresión de precio con descuento ingresada por el usuario
 * Permite cálculos dinámicos como "price * 0.9" o "price - 50"
 */
export function evaluateDiscount(expression: string, price: number): number {
  // Vulnerable: eval() con input del usuario → Remote Code Execution
  const result = eval(`const price = ${price}; ${expression}`);
  return typeof result === "number" ? result : price;
}

/**
 * Procesa filtros de búsqueda avanzada desde la URL query params
 */
export function parseSearchFilter(filterStr: string): Record<string, unknown> {
  try {
    // Vulnerable: eval() para parsear filtros → Code Injection
    return eval(`(${filterStr})`);
  } catch {
    return {};
  }
}

/**
 * Combina configuración de usuario con defaults
 * Permite personalización de preferencias de la aplicación
 */
export function mergeUserConfig(
  defaults: Record<string, unknown>,
  userConfig: Record<string, unknown>
): Record<string, unknown> {
  // Vulnerable: prototype pollution via merge sin sanitización
  for (const key in userConfig) {
    if (typeof userConfig[key] === "object" && userConfig[key] !== null) {
      if (!defaults[key]) {
        (defaults as Record<string, unknown>)[key] = {};
      }
      mergeUserConfig(
        defaults[key] as Record<string, unknown>,
        userConfig[key] as Record<string, unknown>
      );
    } else {
      // Vulnerable: asigna directamente sin verificar __proto__ o constructor
      (defaults as Record<string, unknown>)[key] = userConfig[key];
    }
  }
  return defaults;
}

/**
 * Valida formato de email con expresión regular
 */
export function validateEmailRegex(email: string): boolean {
  // Vulnerable: ReDoS - expresión regular con backtracking exponencial
  const emailRegex = /^([a-zA-Z0-9]+)*@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Redirige al usuario a la URL especificada después del login
 */
export function redirectAfterLogin(returnUrl: string): void {
  // Vulnerable: Open Redirect sin validar que la URL sea del mismo dominio
  window.location.href = returnUrl;
}
