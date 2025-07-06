//This pattern ensures only one task is processed at a time, and the queue is idle when empty
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(task) {
    this.queue.push(task);
    this.processNext();
  }

  async processNext() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    const task = this.queue.shift();
    try {
      await task();
    } catch (err) {
      console.error('Task failed:', err);
    }
    this.processing = false;
    this.processNext();
  }
}
