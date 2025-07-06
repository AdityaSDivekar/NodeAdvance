// worker.js

// const { workerData, parentPort } = require('worker_threads') 

// console.log('Worker Threads by ' + workerData); 

// parentPort.postMessage({ fileName: workerData, status: 'Done' })

const { parentPort, workerData } = require('worker_threads');

// Simulate a CPU-intensive task
function performCPUIntensiveTask() {
  let result = 0;
  for (let i = 0; i < 1_000_000; i++) {
    result += i;
  }
  return result;
}

const result = performCPUIntensiveTask();

// Send the result back to the main thread
parentPort.postMessage({ receivedData: workerData, calculatedSum: result });
