const express = require('express');
const wss = require('./src/sockets/sockets');
const http = require('http');
const { notFoundHandler, errorHandler } = require('./src/middlewares/errorHandler');
const morgan = require('morgan');
require('dotenv').config();




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./src/routes/api.route'));

const server = http.createServer(app);

// WebSocket server setup
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Middleware to generate 404 error for undefined routes
app.use(notFoundHandler)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
