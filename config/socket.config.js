const Cart = require('../models/Cart');

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log(`✓ Cliente conectado: ${socket.id}`);

    // Listener: obtener carrito actualizado
    socket.on('getCart', async () => {
      try {
        let cart = await Cart.findOne().populate('products.productId');
        if (!cart) {
          cart = new Cart({ products: [] });
          await cart.save();
        }
        socket.emit('cartUpdated', cart);
      } catch (error) {
        socket.emit('error', error.message);
      }
    });

    // Listener: producto agregado al carrito
    socket.on('productAdded', async () => {
      try {
        let cart = await Cart.findOne().populate('products.productId');
        io.emit('cartUpdated', cart);
      } catch (error) {
        io.emit('error', error.message);
      }
    });

    // Listener: producto removido del carrito
    socket.on('productRemoved', async () => {
      try {
        let cart = await Cart.findOne().populate('products.productId');
        io.emit('cartUpdated', cart);
      } catch (error) {
        io.emit('error', error.message);
      }
    });

    // Listener: carrito vaciado
    socket.on('cartCleared', async () => {
      try {
        let cart = await Cart.findOne().populate('products.productId');
        io.emit('cartUpdated', cart);
      } catch (error) {
        io.emit('error', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`✗ Cliente desconectado: ${socket.id}`);
    });
  });
}

module.exports = setupSocket;
