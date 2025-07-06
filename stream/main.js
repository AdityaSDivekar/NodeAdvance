const fs = require('fs');
const zlib = require('zlib');
const { Transform } = require('stream');

// 1. Create a readable stream from a source file
const readable = fs.createReadStream('input.txt', 'utf8');

// 2. Create a transform stream to modify the data (e.g., uppercase)
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Convert chunk to uppercase
    callback(null, chunk.toString().toUpperCase());
  }
});

// 3. Create a gzip transform stream for compression
const gzip = zlib.createGzip();

// 4. Create a writable stream to the destination file
const writable = fs.createWriteStream('output.txt.gz');

// 5. Chain all the streams together
readable
  .pipe(upperCaseTransform) // Transform the data
  .pipe(gzip)               // Compress the data
  .pipe(writable)           // Write to destination
  .on('finish', () => {
    console.log('File processed, transformed, and compressed successfully.');
  });
