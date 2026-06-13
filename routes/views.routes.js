const express = require('express');
const Product = require('../models/Product');
const ViewCartController = require('../controllers/ViewCartController');

const router = express.Router();

// GET home
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// GET listado de productos
router.get('/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort = 'price', limit = 10, page = 1 } = req.query;

    // Construir query string para la API
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    queryParams.append('sort', sort);
    queryParams.append('limit', limit);
    queryParams.append('page', page);

    // Llamar a la API
    const apiUrl = `http://localhost:8080/api/products?${queryParams}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Preparar datos para la vista
    const filters = { category: category || '', minPrice: minPrice || '', maxPrice: maxPrice || '' };
    const currentPage = parseInt(page);
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < data.totalPages;
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    res.render('pages/products', {
      products: data.products,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      filters,
      sort,
      hasPrev,
      hasNext,
      prevPage,
      nextPage,
    });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

// GET detalle de producto
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).render('error', { error: 'Producto no encontrado' });
    res.render('pages/product-detail', { product });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});

// Rutas del carrito
router.get('/cart', ViewCartController.getCart);
router.post('/cart/add', ViewCartController.addProduct);
router.post('/cart/remove/:pid', ViewCartController.removeProduct);
router.post('/cart/clear', ViewCartController.clearCart);

// Ruta para subir imagen
router.get('/upload/:pid', async (req, res) => {
  res.render('pages/upload-image', { productId: req.params.pid });
});

module.exports = router;
