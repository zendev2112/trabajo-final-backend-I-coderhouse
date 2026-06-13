const ProductDAO = require('../dao/ProductDAO');

class ProductController {
  // GET todos los productos
  static async getAll(req, res) {
    try {
      const products = await ProductDAO.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET producto por ID
  static async getById(req, res) {
    try {
      const product = await ProductDAO.getById(req.params.pid);
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
      const product = await ProductDAO.create({ title, description, price, category, stock });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT actualizar producto
  static async update(req, res) {
    try {
      const product = await ProductDAO.update(req.params.pid, req.body);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE producto
  static async delete(req, res) {
    try {
      const product = await ProductDAO.delete(req.params.pid);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
