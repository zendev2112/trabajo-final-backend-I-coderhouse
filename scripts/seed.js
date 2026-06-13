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
      {
        title: 'Webcam',
        description: 'Webcam Full HD',
        price: 80,
        category: 'Accesorios',
        stock: 15,
      },
      {
        title: 'Micrófono',
        description: 'Micrófono USB profesional',
        price: 200,
        category: 'Audio',
        stock: 12,
      },
      {
        title: 'SSD',
        description: 'SSD 1TB NVMe',
        price: 110,
        category: 'Electrónica',
        stock: 25,
      },
      {
        title: 'RAM',
        description: 'RAM 16GB DDR4',
        price: 90,
        category: 'Electrónica',
        stock: 18,
      },
      {
        title: 'Mousepad',
        description: 'Mousepad XXL RGB',
        price: 45,
        category: 'Accesorios',
        stock: 40,
      },
      {
        title: 'Hub USB',
        description: 'Hub USB 3.0 7 puertos',
        price: 35,
        category: 'Accesorios',
        stock: 22,
      },
      {
        title: 'Cable HDMI',
        description: 'Cable HDMI 2.1 2m',
        price: 20,
        category: 'Accesorios',
        stock: 60,
      },
    ];

    await Product.insertMany(products);
    console.log('✓ 12 productos agregados');

    await mongoose.connection.close();
    console.log('✓ Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
