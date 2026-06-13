const fs = require('fs').promises;
const path = require('path');
const Product = require('../models/Product');

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

class ProductDAO {
  // Asegurar que el archivo existe
  async ensureFile() {
    try {
      await fs.access(PRODUCTS_FILE);
    } catch {
      await fs.mkdir(path.dirname(PRODUCTS_FILE), { recursive: true });
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify([], null, 2));
    }
  }

  // Obtener todos los productos (MongoDB)
  async getAll(query = {}) {
    return await Product.find(query);
  }

  // Obtener producto por ID
  async getById(id) {
    return await Product.findById(id);
  }

  // Crear producto (MongoDB + FileSystem)
  async create(productData) {
    const product = new Product(productData);
    await product.save();
    await this.saveToFile(product);
    return product;
  }

  // Actualizar producto
  async update(id, productData) {
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (product) await this.saveToFile(product);
    return product;
  }

  // Eliminar producto
  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  // Guardar en archivo (FileSystem backup)
  async saveToFile(product) {
    await this.ensureFile();
    const products = await this.readFromFile();
    const index = products.findIndex((p) => p._id === product._id.toString());
    if (index >= 0) {
      products[index] = { ...product.toObject() };
    } else {
      products.push({ ...product.toObject() });
    }
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  }

  // Leer desde archivo
  async readFromFile() {
    await this.ensureFile();
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  }
}

module.exports = new ProductDAO();
