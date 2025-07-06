const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set status code and headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send response body
  res.end('Hello, World!\n');
});

// Define port and host
const PORT = 3000;
const HOST = 'localhost';

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

// for handling routes

// const server = http.createServer((req, res) => {
//   if (req.url === '/about') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('About Page');
//   } else if (req.url === '/json') {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Hello, JSON!' }));
//   } else {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Home Page');
//   }
// });

// setting custom headers

res.writeHead(200, {
  'Content-Type': 'text/html',
  'X-Custom-Header': 'MyValue'
});
res.end('<h1>Custom Header Example</h1>');

//handling post requests

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     let body = '';
//     req.on('data', chunk => { body += chunk; });
//     req.on('end', () => {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end(`Received: ${body}`);
//     });
//   }
// });
