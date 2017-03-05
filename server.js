// This file becomes a mini server that does a few special handling things for
// us, and otherwise forwards everything to json-server.

import jsonServer from 'json-server';
import low from 'lowdb';

const server = jsonServer.create();
const dbPath = '../data/db.json';
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get('/definitions', (req, res, next) => setTimeout(next, 400));
server.get('/users', (req, res, next) => setTimeout(next, 400));
server.get('/terms', (req, res, next) => setTimeout(next, 400));

server.post('/terms', (req, res, next) => {
  setTimeout(() => {
    const { name: term } = req.body;
    const db = low(dbPath);
    const termRecord = db.get('terms').find(x => x.name.toLowerCase() === term.toLowerCase()).value();
    if (termRecord) {
      res.status(409).send({ message: 'Duplicate term: ' + term });
    } else {
      next();
    }
  }, 400);
});

server.post('/definitions', (req, res, next) => {
  setTimeout(() => {
    const definition = req.body;
    if (definition.content === 'error') {
      return res.status(400).send({ message: 'Your definition was literally "error". No bueno.' })
    }
    next();
  }, 400);
});

server.use(router);

const port = parseInt(process.env.PORT, 10) || 3000;

server.listen(port, function () {
  console.log('JSON Server is running on port ' + port);
});