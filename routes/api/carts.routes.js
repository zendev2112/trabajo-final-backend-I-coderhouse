const express = require('express');
const CartController = require('../../controllers/CartController');

const router = express.Router();

// POST crear carrito
router.post('/', CartController.create);

// GET carrito por ID
router.get('/:cid', CartController.getById);

// POST agregar producto al carrito
router.post('/:cid/products/:pid', CartController.addProduct);

// DELETE producto del carrito
router.delete('/:cid/products/:pid', CartController.removeProduct);

// DELETE vaciar carrito
router.delete('/:cid', CartController.clear);

module.exports = router;
