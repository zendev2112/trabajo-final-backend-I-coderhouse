const mongoose = require('mongoose');
require('dotenv').config();

// Conexión a MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✓ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('✗ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
