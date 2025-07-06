// Node.Js clusters are used to run multiple instances in single threaded Node application. By using cluster module you can distribute workloads among application threads. The cluster module allows us to create child processes that all share server ports. To handle heavy load, we need to launch a cluster of Node.js processes and hence make use of multiple cores.

// Each child process has its own event loop, memory, V8 instance, and shares the same server port.


// const cluster = require('cluster');
// const os = require('os');
// const express=require("express"); 
// const app=express(); 

// if (cluster.isMaster) {
//   // Master process code
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers equal to the number of CPU cores
//   for (let i = 0; i < os.cpus().length; i++) {
//     cluster.fork();
//   }

//   // Listen for worker exit and fork a new one
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
// } else {
//   // Worker process code
//   console.log(`Worker ${process.pid} started`);

//   const port=8000; 
//     app.listen(port,(req,res)=>{ 
//       console.log(`server running at port ${port}`); 
//     }); 
// }

import cluster from 'node:cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary pid=${process.pid}`);
  // Fork workers.
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  // Restart worker if it exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Starting a new worker.`);
    cluster.fork();
  });
} else {
  // Your server code here (e.g., Express app)
  import('./index.js');
}
