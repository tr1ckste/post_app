'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

http.createServer(async(req, res) => {
  const url = req.url === '/' ? '/html/index.html' : req.url;
  const [first, second] = url.substring(1).split('/');
  const path = `./${first}/${second}`;
  try {
    const data = await fs.promises.readFile(path);
    res.end(data);
  } catch (err) {
    httpError(res, 404, 'File is not found');
  }
}).listen(8000);

console.log('sever is running on 127.0.0.1:8000');
