//server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('responses.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
//server.get('/api/suggestion', (req, res) => res.status(500).jsonp({}));
server.use(jsonServer.rewriter({
   '/api/suggestion': '/suggestion',
   '/v1/*': '/bitcoinMarketData',
   })
);
// Use default router
server.use(router);
server.listen(3000, () => {
   console.log('Fake-Backend Server is running');
});