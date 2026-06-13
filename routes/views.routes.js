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
    const products = await Product.find();
    res.render('pages/products', { products });
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
