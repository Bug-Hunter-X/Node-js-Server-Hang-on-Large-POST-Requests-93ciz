const http = require('http');

const server = http.createServer((req, res) => {
  // Without this check, the server will hang on large requests
  // that exceed the default memory limit.
  if (req.method === 'POST' && req.headers['content-length'] > 1024 * 1024) {
    res.writeHead(413, { 'Content-Type': 'text/plain' });
    res.end('Request Entity Too Large');
    return; 
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Success!', data }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON');
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});