# Estructura del Proyecto - Justificación

## ¿Por qué estos directorios?

### `routes/` → Organización de rutas
- **Función**: Separar las rutas HTTP en módulos
- **routes/api/`: Endpoints de la API REST (productos, carritos)
- **Ventaja**: Cada router es un archivo independiente, fácil de mantener

### `controllers/` → Lógica de negocio
- **Función**: Contiene la lógica para procesar requests
- **Ejemplo**: `productsController.js` con funciones para GET, POST, DELETE
- **Ventaja**: Separación de responsabilidades. Las rutas solo dirigen, los controllers hacen

### `models/` → Esquemas de datos
- **Función**: Definir la estructura de los datos en MongoDB
- **Ejemplo**: `Product.js` define qué campos tiene un producto
- **Ventaja**: Validación de datos, garantiza consistencia en BD

### `config/` → Configuración
- **Función**: Archivos de configuración (Handlebars, variables de entorno)
- **Ventaja**: Cambios de configuración sin tocar código principal

### `db/` → Conexión a base de datos
- **Función**: Conectar a MongoDB
- **Ventaja**: Centralizado, reutilizable en toda la aplicación

### `dao/` → Data Access Object (DAO Pattern)
- **Función**: Abstracción para acceso a datos (FileSystem o MongoDB)
- **Ventaja**: Permite cambiar persistencia sin cambiar el resto del código

### `public/` → Archivos estáticos
- **css/`: Estilos
- **js/`: JavaScript del cliente
- **uploads/`: Imágenes cargadas con Multer

### `views/` → Plantillas Handlebars
- **layouts/`: Estructura base (main.hbs)
- **partials/**: Componentes reutilizables (header, footer, product-card)
- **pages/**: Páginas individuales (products.hbs, cart.hbs)

## Patrón de Arquitectura

request HTTP
    ↓
routes/ (¿Qué URL es?)
    ↓
controllers/ (¿Qué debo hacer?)
    ↓
dao/ (¿De dónde obtengo datos?)
    ↓
models/ (¿Cómo se valida?)
    ↓
response JSON o HTML

## Beneficios

✅ **Modularidad**: Cada cosa en su lugar
✅ **Escalabilidad**: Fácil de agregar funcionalidades
✅ **Mantenibilidad**: Si hay error, sé dónde buscarlo
✅ **Profesionalismo**: Estructura estándar en la industria
