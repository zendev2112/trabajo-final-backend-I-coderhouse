const fs = require('fs').promises;
const path = require('path');
const Cart = require('../models/Cart');

const CARTS_FILE = path.join(__dirname, '../data/carts.json');

class CartDAO {
  // Asegurar que el archivo existe
  async ensureFile() {
    try {
      await fs.access(CARTS_FILE);
    } catch {
      await fs.mkdir(path.dirname(CARTS_FILE), { recursive: true });
      await fs.writeFile(CARTS_FILE, JSON.stringify([], null, 2));
    }
  }

  // Obtener carrito por ID
  async getById(id) {
    return await Cart.findById(id).populate('products.productId');
  }

  // Obtener el carrito actual (primer carrito)
  async getCurrent() {
    return await Cart.findOne().populate('products.productId');
  }

  // Crear carrito
  async create() {
    const cart = new Cart({ products: [] });
    await cart.save();
    await this.saveToFile(cart);
    return cart;
  }

  // Actualizar carrito
  async update(id, cartData) {
    const cart = await Cart.findByIdAndUpdate(id, cartData, { new: true }).populate(
      'products.productId'
    );
    if (cart) await this.saveToFile(cart);
    return cart;
  }

  // Guardar en archivo (FileSystem backup)
  async saveToFile(cart) {
    await this.ensureFile();
    const carts = await this.readFromFile();
    const index = carts.findIndex((c) => c._id === cart._id.toString());
    if (index >= 0) {
      carts[index] = { ...cart.toObject() };
    } else {
      carts.push({ ...cart.toObject() });
    }
    await fs.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2));
  }

  // Leer desde archivo
  async readFromFile() {
    await this.ensureFile();
    const data = await fs.readFile(CARTS_FILE, 'utf-8');
    return JSON.parse(data);
  }
}

module.exports = new CartDAO();
