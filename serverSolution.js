const http = require('http');

const server = http.createServer((req, res) => {
  // Check for request size before processing
  const contentLength = req.headers['content-length'];
  if (req.method === 'POST' && contentLength && parseInt(contentLength) > 1024 * 1024) {
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