import http from 'http';

import { app } from './app.js';

const PORT = process.env.PORT || 5100;

const server = http.createServer(app);

server.listen(PORT);

server.on('error', () => {});

server.on('listening', () => {
  console.log('Listening http://localhost: ' + PORT);
});
