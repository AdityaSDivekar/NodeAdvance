const express = require('express');
const request = require('request');
const app = express();

const servers = ['http://localhost:3000', 'http://localhost:3001'];
let current = 0;

app.use((req, res) => {
  const target = servers[current];
  current = (current + 1) % servers.length;
  req.pipe(request({ url: target + req.url })).pipe(res);
});

app.listen(8080, () => {
  console.log('Load balancer running on port 8080');
});
