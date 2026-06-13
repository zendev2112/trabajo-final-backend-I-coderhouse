const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db/connection');
const setupSocket = require('./config/socket.config');

// Inicializar app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
connectDB();

// Configurar WebSockets
setupSocket(io);

// Configurar vistas (Handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layouts/main' });

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de vistas
const viewsRouter = require('./routes/views.routes');
app.use('/', viewsRouter);

// Rutas API
const productsRouter = require('./routes/api/products.routes');
const cartsRouter = require('./routes/api/carts.routes');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
  console.log(`✓ WebSockets activos`);
});
