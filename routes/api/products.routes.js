const express = require('express');
const ProductController = require('../../controllers/ProductController');
const upload = require('../../config/multer.config');

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

// POST subir imagen
router.post('/upload/:pid', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se cargó ninguna imagen' });
    }

    const Product = require('../../models/Product');
    const imagePath = `/uploads/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(req.params.pid, { image: imagePath }, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Imagen cargada exitosamente', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
