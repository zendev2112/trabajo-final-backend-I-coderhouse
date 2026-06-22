# Trabajo Final Backend I - Coderhouse

API REST e-commerce completa con Node.js, Express y MongoDB.

## Requisitos

- Node.js v14 o superior
- npm
- Cuenta MongoDB Atlas

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone git@github.com:zendev2112/trabajo-final-backend-I-coderhouse.git
   cd app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz del proyecto:
   ```
   MONGODB_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/ecommerce?appName=Cluster0
   PORT=8080
   ```

4. **Poblar base de datos (opcional)**
   ```bash
   npm run seed
   ```

## Ejecución

**Desarrollo (con nodemon):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor se ejecutará en `http://localhost:8080`

## Estructura del Proyecto

```
app/
├── config/                 # Configuraciones
│   ├── multer.config.js   # Carga de archivos
│   └── socket.config.js   # WebSockets
├── controllers/            # Lógica de negocio
│   ├── ProductController.js
│   ├── CartController.js
│   └── ViewCartController.js
├── dao/                    # Data Access Object
│   ├── ProductDAO.js      # (MongoDB + FileSystem)
│   └── CartDAO.js
├── models/                 # Esquemas MongoDB
│   ├── Product.js
│   └── Cart.js
├── routes/
│   ├── api/               # Rutas REST
│   │   ├── products.routes.js
│   │   └── carts.routes.js
│   └── views.routes.js    # Rutas de vistas
├── views/                  # Templates Handlebars
│   ├── layouts/main.hbs
│   └── pages/
│       ├── products.hbs
│       ├── product-detail.hbs
│       ├── cart.hbs
│       └── ...
├── public/                 # Archivos estáticos
│   ├── css/styles.css
│   ├── js/socket.js
│   └── uploads/           # Imágenes de productos
├── scripts/
│   └── seed.js            # Población inicial de datos
└── index.js               # Punto de entrada
```

## API Endpoints

### Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products?category=Electrónica` | Filtrar por categoría |
| GET | `/api/products?minPrice=100&maxPrice=500` | Filtrar por precio |
| GET | `/api/products?limit=10&page=1` | Paginación |
| GET | `/api/products?sort=price` | Ordenar por precio |
| GET | `/api/products/:pid` | Obtener producto por ID |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |
| POST | `/api/products/upload/:pid` | Subir imagen |

### Carritos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/carts` | Crear carrito |
| GET | `/api/carts/:cid` | Obtener carrito |
| POST | `/api/carts/:cid/products/:pid` | Agregar producto |
| DELETE | `/api/carts/:cid/products/:pid` | Quitar producto |
| DELETE | `/api/carts/:cid` | Vaciar carrito |

## Vistas Web

| Ruta | Descripción |
|------|-------------|
| GET `/` | Home |
| GET `/products` | Listado de productos con filtros |
| GET `/products/:pid` | Detalle del producto |
| GET `/cart` | Carrito de compras |
| GET `/upload/:pid` | Subir imagen de producto |

## Características

### ✓ API REST Completa
- CRUD de productos y carritos
- Filtros, paginación y ordenamiento
- Validación de datos

### ✓ Persistencia Dual
- MongoDB Atlas (base de datos principal)
- FileSystem (respaldo en JSON)
- DAO Pattern para abstracción de datos

### ✓ Vistas Dinámicas
- Handlebars como motor de plantillas
- Listado de productos con filtros
- Carrito interactivo

### ✓ Carga de Archivos
- Multer para subir imágenes
- Almacenamiento en `public/uploads/`
- Validación de tipos MIME

### ✓ WebSockets
- Actualizaciones en tiempo real
- Socket.io integrado
- Eventos de carrito

## Ejemplos de Uso

### Obtener productos con filtros
```bash
curl "http://localhost:8080/api/products?category=Electrónica&minPrice=100&maxPrice=500&limit=5&page=1"
```

### Crear producto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nuevo Producto",
    "description": "Descripción",
    "price": 99,
    "category": "Electrónica",
    "stock": 10
  }'
```

### Subir imagen
```bash
curl -X POST http://localhost:8080/api/products/upload/[ID] \
  -F "image=@imagen.jpg"
```

## Tecnologías Usadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB, Mongoose
- **Vistas**: Handlebars (hbs)
- **WebSockets**: Socket.io
- **Carga de Archivos**: Multer
- **Variables de Entorno**: dotenv
- **Desarrollo**: nodemon

