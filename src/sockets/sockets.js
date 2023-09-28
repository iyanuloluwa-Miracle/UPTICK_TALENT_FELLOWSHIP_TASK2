const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

// Store WebSocket connections in memory
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    // Broadcast the message to all connected clients
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

module.exports = wss;
