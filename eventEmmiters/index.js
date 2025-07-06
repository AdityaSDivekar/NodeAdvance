const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Register an event listener for 'greet'
eventEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Register another event listener for 'greet'
eventEmitter.on('greet', (name) => {
  console.log(`Greetings, ${name}. Welcome!`);
});

// Emit the 'greet' event with an argument
eventEmitter.emit('greet', 'Aadyaa');
// Output:
// Hello, Aadyaa!
// Greetings, Aadyaa. Welcome!

// Register a listener that only runs once
eventEmitter.once('init', () => {
  console.log('Initialization complete.');
});
eventEmitter.emit('init'); // Runs the listener
eventEmitter.emit('init'); // Does not run again

// Error event handling
eventEmitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});
eventEmitter.emit('error', new Error('Something went wrong'));

console.log(eventEmitter.eventNames()); // e.g., [ 'greet', 'error' ]



// .on(event, listener): Add a listener for an event.

// .once(event, listener): Add a listener that runs only once.

// .emit(event, [...args]): Trigger an event and pass arguments to listeners.

// .removeListener(event, listener) or .off(event, listener): Remove a specific listener.

// .removeAllListeners(event): Remove all listeners for an event