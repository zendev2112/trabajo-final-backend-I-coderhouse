console.log('socket.js cargado');

if (typeof io !== 'undefined') {
  console.log('io está disponible');
  const socket = io();

  socket.on('connect', () => {
    console.log('✓ Conectado a WebSocket');
  });

  socket.on('disconnect', () => {
    console.log('✗ Desconectado de WebSocket');
  });
} else {
  console.error('io no está definido - Socket.io no cargó');
}
