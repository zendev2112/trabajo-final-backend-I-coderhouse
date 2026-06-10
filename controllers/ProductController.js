const Product = require('../models/Product');

class ProductController {
  // GET todos los productos
  static async getAll(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET producto por ID
  static async getById(req, res) {
    try {
      const product = await Product.findById(req.params.pid);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST crear producto
  static async create(req, res) {
    try {
      const { title, description, price, category, stock } = req.body;
      const product = new Product({ title, description, price, category, stock });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT actualizar producto
  static async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.pid, req.body, {
        new: true,
      });
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE producto
  static async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.pid);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
