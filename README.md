# Gas El Volcán — frontend React V2

Frontend React/Vite/Bootstrap para el proyecto DSY1104. Integrado por contrato con la API propia `danaealiante/GasElVolcan-backendV2` (Spring Boot, MySQL, JWT, `/api/v1`). Conserva el tema azul y amarillo y los componentes React del trabajo previo. El proyecto previo partió de una plantilla de curso (Don Kiwi); se conserva el historial existente y no se atribuye la plantilla como código original.

## Instalación

- Node.js 22 y npm; backend V2 en ejecución. Conservar `package.json` y `package-lock.json` del repositorio original.
- Copiar `.env.example` a `.env.local`, indicar `VITE_API_URL` sin `/api` al final. Para desarrollo local: `http://localhost:8080`.
- Ejecutar `npm ci`, `npm run dev`. Abrir la URL de Vite.
- `npm run build` genera `dist/`; `npm test` ejecuta Jasmine/Karma (requiere Chrome); `node --test tests/api.test.mjs` prueba el cliente REST y permisos de navegación. El workflow GitHub Actions además levanta MySQL y el backend V2 para una prueba real del cliente REST. No confundir esa prueba con un E2E de navegador.

## Flujos

- Visitante: catálogo real, carrito, registro e inicio de sesión. Cliente: pedidos propios y perfil de lectura. La V2 no ofrece editar el propio perfil; no hay formulario ficticio.
- Vendedor: listado y detalle de productos y órdenes. Administrador: CRUD de usuarios, categorías y productos; consulta y transiciones de boletas, eliminación de canceladas. Permisos aplicados también por el servidor.
- El token se mantiene en memoria y no se guarda en localStorage; recargar requiere iniciar sesión. Carrito en memoria para no compartir datos entre cuentas. El servidor valida stock y calcula el total.
- Los errores de red, 401, 403 y 409 se muestran sin datos de respaldo inventados.

## AWS y demostración

1. En EC2, revisar si ya hay Elastic IP asociada. Si no, asignar una solo si el laboratorio lo permite y asociarla a la instancia. Puede generar cargos y no garantiza que el lab permanezca disponible. Mantener RDS privado y limitar su SG al SG de EC2.
2. Desplegar el JAR de backend V2 con `DB_URL`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET` (base64 aleatorio de 32 bytes mínimo), `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `CORS_ORIGINS`. Crear una base nueva, no migrar automáticamente datos de V1. No subir secretos ni usar credenciales demo en producción.
3. Para una demostración segura, configurar un dominio/HTTPS en un proxy inverso o balanceador de EC2 y usar HTTPS también para el frontend (CloudFront + S3 privado, por ejemplo). Una Elastic IP no proporciona HTTPS por sí sola. Alternativamente servir `dist/` y la API desde el mismo proxy HTTPS de EC2; no publicar credenciales por HTTP. Ajustar CORS al origen exacto del frontend si son orígenes distintos. El backend local puede estar en puerto 8080 detrás del proxy; no abrirlo al mundo.
4. Compilar con `VITE_API_URL=https://<dominio-api>` (o mismo origen HTTPS si se define explícitamente) y publicar el contenido de `dist/`, no `src/`. HashRouter permite rutas estáticas en S3. Recompilar si cambia la URL.
5. Comprobar salud, Swagger (`/swagger-ui/index.html`), catálogo, los tres logins, CRUD admin, pedido de cliente, stock, vista vendedor y rechazo de rutas de administración. Capturar pantallas reales y actualizar documentos de entrega.

## Estado de verificación

El backend V2 tiene resultados satisfactorios previos de GitHub Actions en H2 y MySQL. Este frontend es una actualización de código; comprobar el build, los tests, y la integración real en Actions y en navegador antes de entregar. AWS, Elastic IP y HTTPS no se han configurado desde este archivo.
