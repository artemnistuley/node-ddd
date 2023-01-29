'use strict';

const http = require('node:http');
const receiveArgs = require('./body.js');

module.exports = (routing, port) => {
  http.createServer(async (req, res) => {
    const { url, socket } = req;
    const [name, method, id] = url.slice(1).split('/');
    const entity = routing[name];
    if (!entity) return res.end('Not found');
    const handler = entity[method];
    if (!handler) return res.end('Not found');
    const src = handler.toString();
    const signature = src.substring(0, src.indexOf(')'));
    const args = [];
    if (signature.includes('(id')) args.push(id);
    if (signature.includes('{')) args.push(await receiveArgs(req));
    console.log(`${socket.remoteAddress} ${method} ${url}`);
    const result = await handler(...args);
    res.end(JSON.stringify(result.rows));
  }).listen(port);

  console.log(`API on port ${port}`);
};
