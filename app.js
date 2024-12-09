// Importa los módulos necesarios
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicializa Express y crea el servidor HTTP
const app = express();
const server = http.createServer(app);

// Inicializa Socket.IO
const io = socketIo(server);

// Servidor: Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Enviar un mensaje al cliente cuando se conecta
    socket.emit('message', 'Hola Mundo desde SocketIO Servidor en javascript');

    // Escuchar mensajes del cliente
    socket.on('clientMessage', (msg) => {
        console.log('Mensaje del cliente:', msg);
    });

    // Desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Configurar la ruta para servir el cliente HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
