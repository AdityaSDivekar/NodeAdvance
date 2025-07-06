
// Install Bull and Redis
// npm install bull


// const Queue = require('bull');

// // Initialize a queue named 'task'
// const taskQueue = new Queue('task', {
//   redis: { host: '127.0.0.1', port: 6379 }
// });

// // Define how each job is processed
// taskQueue.process(async (job) => {
//   // Replace this with your actual task logic
//   console.log('Processing job:', job.id, job.data);
//   // Simulate async work
//   await new Promise(res => setTimeout(res, 1000));
//   return { result: 'done' };
// });

// Add tasks to the queue

// queue_example.js
const Queue = require('bull');

// 1. Create a Bull queue
const taskQueue = new Queue('task', {
  redis: { host: '127.0.0.1', port: 6379 }
});

// 2. Define a processor for the tasks
taskQueue.process(5, async (job) => {
  // Simulate processing (replace with real logic)
  console.log(`Processing job ${job.id}:`, job.data);
  await new Promise(res => setTimeout(res, 500)); // Simulate async work
  return { status: 'done', jobId: job.id };
});

// 3. Add multiple tasks to the queue
(async () => {
  for (let i = 1; i <= 20; i++) {
    await taskQueue.add({ number: i, info: `Task #${i}` });
  }
})();

// 4. Event listeners for monitoring
taskQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed:`, result);
});

taskQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

console.log('Queue setup complete. Waiting for jobs to process...');

// 5 Monitor and Handle Events
taskQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

taskQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

//concurrency and scaling
// You can set the number of concurrent jobs processed by passing a concurrency value:
taskQueue.process(5, async (job) => {
  // Up to 5 jobs processed in parallel
});


//  Alternative: Lightweight In-Memory Queues
// For simple or in-memory needs, you can use packages like task-queue or implement a queue using arrays, but these are not recommended for large-scale or distributed workloads.

// Summary Table
// Library	Backend	Features	Use Case
// Bull	Redis	Robust, repeatable jobs, rate limiting	Production, large-scale tasks
// Bee-Queue	Redis	Fast, simple, distributed worker support	Real-time, short jobs
// task-queue	None	In-memory, async, concurrency, priority	Lightweight, single-process only
// Bull is the most popular choice for handling large numbers of tasks reliably in Node.js, with built-in support for retries, delays, concurrency, and distributed processing
