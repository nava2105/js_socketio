const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fetch = require('node-fetch'); // Simular cliente HTTP
const { io: ClientIo } = require('socket.io-client');

// Initialises Express and creates the HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Socket.IO API Server',
            description: 'Socket.IO API documented with Swagger',
            version: '1.0.0',
        },
        servers: [
            { url: 'http://localhost:8000', description: 'Servidor API' },
        ],
    },
    apis: ['./app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse JSON
app.use(express.json());

// Socket.IO configuration on the server
io.on('connection', (socket) => {
    console.log('Client logged in (Socket.IO)');

    socket.emit('message', { message: 'Hello from the Socket.IO server' });

    socket.on('clientMessage', (msg) => {
        console.log('Message received from customer (Socket.IO):', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

/**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Returns a JSON message
 *     responses:
 *       200:
 *         description: Welcome message.
 */
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello World from the API route' });
});

/**
 * @swagger
 * /api/socket-message:
 *   post:
 *     summary: Send a message to Socket.IO
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientMessage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully.
 */
app.post('/api/socket-message', (req, res) => {
    const { clientMessage } = req.body;
    console.log('Message received from the client by HTTP POST:', clientMessage);

    // Broadcast message to all connected clients
    io.emit('message', { message: clientMessage });

    res.json({ status: 'Message sent via Socket.IO' });
});

// Initialising the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server listening in: http://localhost:${PORT}`);
    console.log(`Server message in: http://localhost:${PORT}/api/message`);
    console.log(`Swagger API Docs: http://localhost:${PORT}/api-docs`);

    // ============================
    // Integrated Client
    // ============================
    console.log('\n--- Simulating Client ---');

    // Cliente HTTP con fetch
    fetch(`http://localhost:${PORT}/api/message`)
        .then((res) => res.json())
        .then((data) => {
            console.log('Response HTTP GET /api/message:', data);
        });

    fetch(`http://localhost:${PORT}/api/socket-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientMessage: 'Hello from the embedded HTTP client' }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Response HTTP POST /api/socket-message:', data);
        });

    // Cliente Socket.IO
    const clientSocket = ClientIo(`http://localhost:${PORT}`);

    clientSocket.on('connect', () => {
        console.log('Socket.IO client connected to the server');

        clientSocket.emit('clientMessage', 'Hello from the embedded Socket.IO client');
    });

    clientSocket.on('message', (data) => {
        console.log('Message received from the server (Socket.IO):', data.message);
    });

    clientSocket.on('disconnect', () => {
        console.log('Socket.IO client disconnected');
    });
});
