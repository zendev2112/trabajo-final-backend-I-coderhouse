const express = require('express');
const path = require('path');
const connectDB = require('./db/connection');

// Inicializar app
const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
connectDB();

// Configurar vistas (Handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
});
