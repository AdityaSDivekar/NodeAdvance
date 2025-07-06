import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`Handled by process ${process.pid}`);
});

app.listen(PORT, () => {
  console.log(`App (PID: ${process.pid}) is listening on port ${PORT}`);
});


// Using PM2 for Clustering (Alternative)
// PM2 is a popular process manager that simplifies clustering:

// bash
// npm install -g pm2
// pm2 start index.js -i 0
// The -i 0 flag tells PM2 to spawn as many instances as there are CPU cores.

// PM2 handles process management, restarts, and monitoring for you.