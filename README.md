# Node.js Server Hang on Large POST Requests

This repository demonstrates a common issue in Node.js servers where they hang or crash when receiving large POST requests.  The problem occurs because Node.js's event loop gets blocked while processing large amounts of data.

## Problem

The `server.js` file contains a basic HTTP server that processes JSON POST requests.  Without any safeguards, large requests will cause the server to hang and potentially consume excessive memory leading to a crash.

## Solution

The `serverSolution.js` file provides a solution by checking the `content-length` header of the incoming request.  If the request is larger than a specified limit (1MB in this example), the server returns a `413 Payload Too Large` error, preventing it from processing the entire request and avoiding the hang.

## How to Reproduce

1. Clone this repository.
2. Navigate to the project directory.
3. Run `node server.js` to start the problematic server.
4. Use a tool like `curl` or Postman to send a large POST request (e.g., a JSON payload exceeding 1MB).
5. Observe the server's behavior (it will likely hang).
6. Repeat steps 2-5, but this time, run `node serverSolution.js` to see the improved behavior with the added safeguard.

## Lessons Learned

* Always validate and limit the size of incoming requests to prevent memory exhaustion and server crashes. 
* Check `content-length` or use streaming techniques to handle large requests efficiently.
* Consider using a reverse proxy or load balancer to manage large requests and distribute the load. 