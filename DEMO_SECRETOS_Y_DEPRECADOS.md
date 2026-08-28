# Demo: Secretos expuestos y dependencias deprecadas

> Material **educativo**. Todo lo añadido es intencionalmente inseguro para
> demostrar controles de seguridad. **No** mezclar con `main` de un proyecto real.

## 1. Secretos hardcodeados añadidos

| Archivo | Qué contiene | Detector que lo bloquea |
|---|---|---|
| `src/config/secrets.ts` | AWS, GitHub PAT, Stripe, Google, Slack, SendGrid, Resend, JWT, `DATABASE_URL`, clave RSA | GitHub Push Protection, Gitleaks, TruffleHog, Horusec |
| `src/config/config.ts` | "fallback" hardcodeado de Google/Resend API key | Gitleaks, Horusec, ESLint (reglas custom) |
| `src/utils/api/request.ts` | Bearer token de admin (JWT) hardcodeado | Gitleaks, Horusec |
| `.env.production` | archivo de entorno versionado por error (`.gitignore` solo ignora `.env`) | GitHub Secret Scanning, Gitleaks |

Ninguno de los valores es real: tienen el **formato** correcto para disparar
los escáneres, pero no autentican contra nada.

## 2. Cómo ver el bloqueo de GitHub

1. `git add . && git commit -m "demo: secretos expuestos"`
2. `git push origin <rama-demo>`
3. GitHub rechaza el push con `GH013: Repository rule violations found` y lista
   cada secreto (tipo, archivo, línea). El commit **no** llega al remoto.
4. Opciones que ofrece GitHub: corregir el secreto, o marcarlo como falso
   positivo / "usado en pruebas" (solo para la demo).

> Requiere que **Push Protection** esté activo:
> repo → *Settings* → *Code security and analysis* → *Secret scanning* →
> *Push protection*. En repos públicos está activo por defecto.

### Hook local opcional (bloquea antes de llegar a GitHub)

```bash
# pre-commit con Gitleaks
gitleaks protect --staged --verbose
```

## 3. Remediación correcta

1. Quitar el secreto del código y leerlo de una variable de entorno.
2. Añadir `.env*` completo al `.gitignore` (no solo `.env`).
3. **Rotar** la credencial filtrada (aunque se borre del historial, se
   considera comprometida).
4. Limpiar el historial si ya se subió: `git filter-repo` o BFG.
5. Guardar secretos en GitHub Actions Secrets / Vault / gestor del proveedor.

## 4. Dependencias deprecadas añadidas

`package.json`:

- `request@^2.88.2` — deprecado desde 2020, sin mantenimiento.
- `node-uuid@^1.4.8` — reemplazado por `uuid`.
- `core-js@^2.6.12` — la v2 está deprecada, pide migrar a v3.
- `left-pad@^1.3.0` — caso histórico, funcionalidad nativa (`String.padStart`).
- `tslint@^6.1.3` — deprecado en favor de `eslint`/`typescript-eslint`.
- `gulp-util@^3.0.8` — deprecado, dividido en módulos independientes.
- `istanbul@^0.4.5` — deprecado, usar `nyc`.
- `phantomjs-prebuilt@^2.1.16` — proyecto archivado, usar headless Chrome.

Al ejecutar `pnpm install` aparecen avisos `WARN deprecated ...`.
`npm audit` / Dependabot / el SCA (DefectDojo) también los reportan.

### Cómo lo detectan

```bash
pnpm install            # muestra los WARN deprecated
pnpm outdated           # versiones desactualizadas
pnpm audit              # vulnerabilidades conocidas
npx depcheck            # además, dependencias sin usar
```

## 5. Revertir la demo

```bash
git checkout -- package.json src/config/config.ts src/utils/api/request.ts
rm src/config/secrets.ts .env.production DEMO_SECRETOS_Y_DEPRECADOS.md
```
