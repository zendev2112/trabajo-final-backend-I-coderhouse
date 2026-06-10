const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✓ Conectado a MongoDB');

    // Eliminar productos existentes
    await Product.deleteMany({});
    console.log('✓ Productos anteriores eliminados');

    // Crear productos de prueba
    const products = [
      {
        title: 'Laptop',
        description: 'Laptop de alto rendimiento',
        price: 1200,
        category: 'Electrónica',
        stock: 5,
      },
      {
        title: 'Mouse',
        description: 'Mouse inalámbrico',
        price: 25,
        category: 'Accesorios',
        stock: 50,
      },
      {
        title: 'Teclado',
        description: 'Teclado mecánico RGB',
        price: 120,
        category: 'Accesorios',
        stock: 30,
      },
      {
        title: 'Monitor',
        description: 'Monitor 27" 4K',
        price: 400,
        category: 'Electrónica',
        stock: 10,
      },
      {
        title: 'Headphones',
        description: 'Auriculares inalámbricos',
        price: 150,
        category: 'Audio',
        stock: 20,
      },
    ];

    await Product.insertMany(products);
    console.log('✓ 5 productos agregados');

    await mongoose.connection.close();
    console.log('✓ Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
