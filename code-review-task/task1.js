const http = require('http');
 const server = http.createServer((req, res) => {
 if (req.url === '/data' && req.method === 'GET') {
 fs.readFile('./data.json', (err, data) => {
 if (err) {
 res.writeHead(500, { 'Content-Type': 'application/json' });
 res.end(JSON.stringify({ error: 'Internal Server Error' }));
 return
}
 res.writeHead(200, { 'Content-Type': 'application/json' });
 res.end(data);
 });
 } else {
 res.writeHead(404, { 'Content-Type': 'application/json' });
 res.end(JSON.stringify({ error: 'Not Found' }));
 }
 });
 server.listen(3000, () => {
 console.log('Server is listening on port 3000');
 })

// Issues and Improvements:

// Error Handling:
// The current error handling mechanism is adequate, but it could be enhanced to provide more
// specific error messages and log the errors for debugging purposes.

// Code Structure:
// The fs module is used but not imported, and it should be imported at the top of the file.
// The use of path.join ensures cross-platform compatibility when dealing with file paths.
// The callback in fs.readFile should specify the encoding (utf8) to ensure the data is read as a string, not a buffer.
// Improved modularity and readability by extracting request handling logic into separate functions.

// Performance:
// For a simple application, fs.readFile is acceptable. For a production environment,
// consider caching the file contents if the file doesn't change frequently to reduce I/O operations.

// Security:
// Always sanitize the inputs to avoid potential security risks like path traversal attacks.
// Set additional HTTP headers to improve security (e.g., X-Content-Type-Options: nosniff).

 // Revised Code with Improvements

 const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to handle file reading
const readFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', callback);
};

// Function to handle /data endpoint
const handleDataRequest = (res) => {
  const filePath = path.join(__dirname, 'data.json');

  readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  if (req.url === '/data' && req.method === 'GET') {
    handleDataRequest(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// Summary of Changes:

// Error Handling:
// Enhanced logging for error messages.

// Code Structure:
// Moved file reading logic into a helper function.
// Created a separate function to handle the /data request.
// Ensured the fs module is imported.

// Security:
// Added the X-Content-Type-Options header to prevent MIME type sniffing.
// Sanitized file paths using path.join.