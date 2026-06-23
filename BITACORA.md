# Bitácora de Desarrollo - Trabajo Final Backend I

## 6 de junio, 2026

### 1. Inicialización del proyecto
- [x] Crear estructura de directorios en carpeta `app/`
- [x] Inicializar repositorio Git
- [x] Configurar remote a GitHub (zendev2112)
- [x] Primer commit: "Crear estructura base del proyecto"

### Estado actual:
- Repo: git@github.com:zendev2112/trabajo-final-backend-I-coderhouse.git
- Estructura: routes/, controllers/, models/, config/, db/, dao/, public/, views/
- Próximo paso: Crear package.json e instalar dependencias


### 2. Dependencias instaladas
- [x] Crear package.json
- [x] npm install completado
- Dependencias: express, mongoose, multer, dotenv, express-handlebars

### 3. Configurar MongoDB Atlas
- [x] Crear cuenta en MongoDB Atlas
- [x] Crear cluster gratuito (cluster0)
- [x] Obtener connection string
- [x] Crear archivo .env con MONGODB_URL y PORT
- [x] Crear archivo db/connection.js con función connectDB
- [x] Crear index.js (servidor principal)
- [x] Crear vista inicial (views/index.hbs)

### Troubleshooting encontrados y resueltos

**Error 1: "Cannot find module 'hbs'"**
- Causa: Express necesita hbs pero no estaba instalado
- Solución: `npm install hbs`
- Resultado: ✓ Resuelto

**Error 2: "Could not connect to any servers in your MongoDB Atlas cluster"**
- Causa: IP local no estaba whitelisted en MongoDB Atlas
- Solución: MongoDB Atlas → Security → Network Access → Add Current IP
- Resultado: ✓ Resuelto

**Error 3: "Cannot find module express-handlebars" (ERR_MODULE_NOT_FOUND)**
- Causa: Intenté usar exphbs en config/handlebars.config.js con helpers personalizados
- Problema: El curso vió solo `hbs`, no `express-handlebars`
- Solución: Simplificar usando solo `hbs` directamente en index.js, sin archivo de configuración
- Resultado: ✓ Resuelto, vistas funcionan sin helpers personalizados

**Error 4: "Cannot GET /api/carts" y "Cannot GET /cart"**
- Causa: Rutas no registradas después de agregar controladores
- Proceso: Agregué ViewCartController pero rutas no estaban activas
- Solución: Reiniciar servidor con Ctrl+C y `npm run dev`
- Resultado: ✓ Resuelto, rutas ahora funcionan

**Error 5: Campo "Cantidad" en carrito suma como string (1+2 = 12)**
- Causa: El formulario POST envía quantity como string, no número
- Testing: Agregué producto con cantidad 1, luego 2, resultado mostró "12" en lugar de "3"
- Debugging: JavaScript concatenó strings en lugar de sumar números (1 + "2" = "12")
- Solución: Convertir quantity a número con `parseInt(quantity)` en ViewCartController y CartController
- Resultado: ✓ Resuelto, ahora suma correctamente

### 4. MongoDB conectado exitosamente
- [x] Instalar hbs con `npm install hbs`
- [x] Agregar nombre de BD a connection string (/ecommerce)
- [x] Agregar IP a MongoDB Atlas Network Access
- [x] Servidor ejecutándose en puerto 8080
- [x] MongoDB conectado sin errores

### 5. Crear modelos de datos
- [x] Crear Product.js (title, description, price, category, image, stock)
- [x] Crear Cart.js (products array con referencia a Product)

### 6. Crear controladores y rutas API
- [x] ProductController.js (CRUD: getAll, getById, create, update, delete)
- [x] CartController.js (getById, create, addProduct, removeProduct, clear)
- [x] routes/api/products.routes.js (GET /, GET /:pid, POST, PUT, DELETE)
- [x] routes/api/carts.routes.js (POST, GET /:cid, POST /:cid/products/:pid, DELETE)
- [x] Registrar rutas en index.js (/api/products, /api/carts)

### 7. Crear vistas con Handlebars
- [x] Crear layout main.hbs (header, footer, nav)
- [x] Crear pages/products.hbs (listado dinámico)
- [x] Crear pages/product-detail.hbs (detalle de producto)
- [x] Crear pages/error.hbs (página de error)
- [x] Crear routes/views.routes.js (rutas de vistas)
- [x] Crear public/css/styles.css (estilos)
- [x] Actualizar index.js con rutas de vistas

### 8. Script para poblar base de datos
- [x] Crear scripts/seed.js (crea 5 productos de prueba)
- [x] Agregar script "seed" en package.json

### Pasos para ejecutar:
1. `npm run seed` - Pobla la BD con productos
2. `npm run dev` - Inicia servidor
3. Abre http://localhost:8080/products - Ver productos

### 9. Implementar carrito en vistas
- [x] Crear pages/cart.hbs (mostrar productos en carrito)
- [x] Crear config/handlebars.config.js (helpers: multiply, sum, ifEquals)
- [x] Crear ViewCartController (getCart, addProduct, removeProduct, clearCart)
- [x] Agregar rutas de carrito en views.routes.js
- [x] Actualizar layouts/main.hbs (agregar enlace a carrito)
- [x] Actualizar product-detail.hbs (enlace a carrito)

### Funcionalidad:
- Listar productos en carrito
- Agregar productos desde detalle
- Quitar productos del carrito
- Vaciar carrito
- Calcular total

### Estado actual del proyecto:
- ✓ Servidor Express en puerto 8080
- ✓ MongoDB Atlas conectado (BD: ecommerce)
- ✓ API REST completa (/api/products, /api/carts)
- ✓ Vistas dinámicas con Handlebars (productos, carrito, detalle)
- ✓ Carrito funcional en la web
- ✓ 5 productos de prueba en la BD

### Rutas activas:
- GET / → Home
- GET /products → Listado de productos
- GET /products/:pid → Detalle del producto
- GET /cart → Ver carrito
- POST /cart/add → Agregar al carrito
- POST /cart/remove/:pid → Quitar del carrito
- POST /cart/clear → Vaciar carrito
- GET /api/products → API: todos los productos
- GET /api/products/:pid → API: producto por ID
- POST /api/products → API: crear producto
- PUT /api/products/:pid → API: actualizar producto
- DELETE /api/products/:pid → API: eliminar producto
- GET /api/carts/:cid → API: carrito por ID
- POST /api/carts → API: crear carrito
- POST /api/carts/:cid/products/:pid → API: agregar producto
- DELETE /api/carts/:cid/products/:pid → API: quitar producto
- DELETE /api/carts/:cid → API: vaciar carrito

### 10. Implementar Multer para carga de imágenes
- [x] Crear config/multer.config.js (validación MIME, límite 5MB)
- [x] Crear ruta POST /api/products/upload/:pid (subir imagen a producto)
- [x] Crear página /upload/:pid (formulario para subir imagen)
- [x] Actualizar product-detail.hbs (mostrar imagen, enlace a subir)
- [x] Las imágenes se guardan en public/uploads/

### 11. Implementar WebSockets con Socket.io
- [x] Instalar socket.io con npm
- [x] Crear config/socket.config.js (escuchar eventos: getCart, productAdded, productRemoved, cartCleared)
- [x] Actualizar index.js para inicializar Socket.io
- [x] Crear public/js/socket.js (cliente Socket.io)
- [x] Agregar script socket.io en layout main.hbs

### Funcionalidad WebSocket:
- Cliente se conecta al servidor
- Escucha cambios en el carrito
- Emite eventos cuando se agregan/quitan productos
- Actualización en tiempo real (preparado para próximas fases)

### 12. Implementar DAO Pattern (Data Access Object)
- [x] Crear dao/ProductDAO.js (getAll, getById, create, update, delete)
- [x] Crear dao/CartDAO.js (getById, getCurrent, create, update)
- [x] Persistencia dual: MongoDB + FileSystem (data/products.json, data/carts.json)
- [x] Actualizar ProductController para usar ProductDAO
- [x] Actualizar CartController para usar CartDAO
- [x] Agregar links a Cart y Products en home

### Funcionalidad DAO:
- Acceso a datos centralizado en DAOs
- Sincronización automática MongoDB ↔ FileSystem
- Backup de datos en archivos JSON

### 13. Filtros, paginación y ordenamiento
- [x] Agregar 12 productos en seed.js (total 12 productos)
- [x] Actualizar ProductDAO.getAll() con filtros, limit, page, sort
- [x] Actualizar ProductController para procesar query params
- [x] Implementar filtrado por categoría, precio min/max
- [x] Implementar paginación (limit, page)
- [x] Implementar ordenamiento (sort)

### Uso en API:
- GET /api/products (todos)
- GET /api/products?category=Electrónica
- GET /api/products?minPrice=100&maxPrice=500
- GET /api/products?limit=5&page=1
- GET /api/products?sort=price
- GET /api/products?category=Accesorios&sort=price&limit=10&page=1

### 14. Filtros y paginación en el frontend
- [x] Agregar formulario de filtros en products.hbs
- [x] Implementar filtrado por categoría, precio min/max en la vista
- [x] Agregar paginación en la vista (botones Anterior/Siguiente)
- [x] Actualizar views.routes.js para llamar a la API con parámetros
- [x] Registrar helper ifEquals en Handlebars

### Funcionalidad frontend:
- Formulario para filtrar por categoría, precio y ordenamiento
- Paginación con botones de navegación
- Mantiene filtros al cambiar de página

### 15. Crear README
- [x] Crear README.md con documentación completa
- [x] Incluir requisitos, instalación, ejecución
- [x] Documentar estructura del proyecto
- [x] Listar todos los endpoints de API
- [x] Incluir ejemplos de uso con curl
- [x] Documentar tecnologías usadas

## PROYECTO COMPLETO ✓

### Resumen final:
- ✓ API REST completa (CRUD productos y carritos)
- ✓ Vistas dinámicas con Handlebars
- ✓ Base de datos MongoDB con Mongoose
- ✓ DAO Pattern con persistencia dual (MongoDB + FileSystem)
- ✓ Filtros, paginación y ordenamiento
- ✓ Carga de imágenes con Multer
- ✓ WebSockets con Socket.io
- ✓ Carrito funcional
- ✓ 12 productos de prueba en BD
- ✓ Documentación completa (README + BITACORA)

### 16. Ajuste final para cumplir requerimientos de la consigna
Tras comparar el proyecto contra la consigna oficial, se corrigieron 7 puntos:
- [x] Modelo Product: agregar campos code (único), status (Boolean), thumbnails (array)
- [x] GET /api/products: respuesta con formato exacto exigido
      (status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink)
- [x] sort por precio ascendente/descendente (sort=asc / sort=desc)
- [x] Parámetro query (filtra por categoría o disponibilidad)
- [x] Agregar PUT /api/carts/:cid (actualizar todos los productos)
- [x] Agregar PUT /api/carts/:cid/products/:pid (actualizar solo cantidad)
- [x] Vista /carts/:cid (carrito específico por ID con populate)
- [x] WebSockets en tiempo real de PRODUCTOS + vista /realtimeproducts
- [x] ProductController.create: recibir code, status, thumbnails
- [x] seed.js: agregar code único a cada producto

### IMPORTANTE: volver a poblar la BD por el nuevo campo code
- Ejecutar `npm run seed` antes de probar

### Próximo paso: Entrega final
