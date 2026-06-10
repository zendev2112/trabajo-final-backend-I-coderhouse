const express = require('express');
const ProductController = require('../../controllers/ProductController');

const router = express.Router();

// GET todos los productos
router.get('/', ProductController.getAll);

// GET producto por ID
router.get('/:pid', ProductController.getById);

// POST crear producto
router.post('/', ProductController.create);

// PUT actualizar producto
router.put('/:pid', ProductController.update);

// DELETE producto
router.delete('/:pid', ProductController.delete);

module.exports = router;
