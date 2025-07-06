// a simple FIFO queue in Node.js without external packages, ensuring that each task is executed independently and sequentially—one at a time—until the queue is empty. This means each operation runs only after the previous one completes, and no two operations run in parallel. This approach is ideal for important tasks that should not interfere with each other.

// serial_queue.js

class SerialQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  // Add a task (must be an async function or return a Promise)
  enqueue(task) {
    this.queue.push(task);
    this.runNext();
  }

  // Internal: Run the next task if not already running
  async runNext() {
    if (this.running) return;
    if (this.queue.length === 0) return;

    this.running = true;
    const task = this.queue.shift();

    try {
      await task();
    } catch (err) {
      console.error('Task error:', err);
    }

    this.running = false;
    // Continue with the next task
    this.runNext();
  }

  // Check if the queue is empty
  isEmpty() {
    return this.queue.length === 0 && !this.running;
  }
}

// Usage example:
const queue = new SerialQueue();

// Add tasks (each task is an async function)
for (let i = 1; i <= 10; i++) {
  queue.enqueue(async () => {
    console.log(`Processing task ${i}`);
    // Simulate async work
    await new Promise(res => setTimeout(res, 1000));
    console.log(`Finished task ${i}`);
  });
}

// You can add more tasks at any time, even while processing
setTimeout(() => {
  queue.enqueue(async () => {
    console.log('Late task added!');
    await new Promise(res => setTimeout(res, 500));
    console.log('Late task done!');
  });
}, 5000);
