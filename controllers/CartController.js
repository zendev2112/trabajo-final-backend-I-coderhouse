const CartDAO = require('../dao/CartDAO');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

class CartController {
  // GET carrito por ID
  static async getById(req, res) {
    try {
      const cart = await CartDAO.getById(req.params.cid);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST crear carrito
  static async create(req, res) {
    try {
      const cart = await CartDAO.create();
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST agregar producto al carrito
  static async addProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const qty = parseInt(quantity) || 1;

      const cart = await Cart.findById(cid);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

      const product = await Product.findById(pid);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

      const existingProduct = cart.products.find((p) => p.productId.toString() === pid);
      if (existingProduct) {
        existingProduct.quantity += qty;
      } else {
        cart.products.push({ productId: pid, quantity: qty });
      }

      await cart.save();
      await CartDAO.saveToFile(cart);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE producto del carrito
  static async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;

      const cart = await Cart.findById(cid);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

      cart.products = cart.products.filter((p) => p.productId.toString() !== pid);
      await cart.save();
      await CartDAO.saveToFile(cart);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE vaciar carrito
  static async clear(req, res) {
    try {
      const { cid } = req.params;

      const cart = await Cart.findById(cid);
      if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

      cart.products = [];
      await cart.save();
      await CartDAO.saveToFile(cart);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartController;
