const Cart = require('../models/Cart');
const Product = require('../models/Product');

class ViewCartController {
  // GET carrito en vista
  static async getCart(req, res) {
    try {
      let cart = await Cart.findOne().populate('products.productId');

      if (!cart) {
        cart = new Cart({ products: [] });
        await cart.save();
      }

      // Preparar datos para la vista
      const products = cart.products.map((item) => ({
        _id: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity,
      }));

      // Calcular total
      let total = 0;
      products.forEach((item) => {
        total += item.price * item.quantity;
      });

      res.render('pages/cart', { products, total });
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }

  // POST agregar producto al carrito
  static async addProduct(req, res) {
    try {
      const { productId, quantity } = req.body;
      const qty = parseInt(quantity) || 1;

      let cart = await Cart.findOne();
      if (!cart) {
        cart = new Cart({ products: [] });
      }

      const product = await Product.findById(productId);
      if (!product) return res.status(404).render('error', { error: 'Producto no encontrado' });

      const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += qty;
      } else {
        cart.products.push({ productId, quantity: qty });
      }

      await cart.save();
      res.redirect('/cart');
    } catch (error) {
      res.status(400).render('error', { error: error.message });
    }
  }

  // POST quitar producto del carrito
  static async removeProduct(req, res) {
    try {
      const { pid } = req.params;

      const cart = await Cart.findOne();
      if (!cart) return res.status(404).render('error', { error: 'Carrito no encontrado' });

      cart.products = cart.products.filter((p) => p.productId.toString() !== pid);
      await cart.save();
      res.redirect('/cart');
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }

  // POST vaciar carrito
  static async clearCart(req, res) {
    try {
      const cart = await Cart.findOne();
      if (!cart) return res.status(404).render('error', { error: 'Carrito no encontrado' });

      cart.products = [];
      await cart.save();
      res.redirect('/cart');
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }
}

module.exports = ViewCartController;
