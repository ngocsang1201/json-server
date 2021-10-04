import jsonServer from 'json-server';
import queryString from 'query-string';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  switch (req.method) {
    case 'POST':
      req.body.createdAt = Date.now();
      req.body.updatedAt = Date.now();
      break;
    case 'PATCH':
      req.body.updatedAt = Date.now();
      break;
  }

  // Continue to JSON Server router
  next();
});

// Custom output for list with pagination
router.render = (req, res) => {
  const headers = res.getHeaders();

  const totalCountHeader = headers['x-total-count'];

  const queryParams = queryString.parse(req._parsedUrl.query);

  if (req.method === 'GET' && totalCountHeader) {
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalCount: Number.parseInt(totalCountHeader),
      },
    };

    return res.jsonp(result);
  }

  res.jsonp(res.locals.data);
};

// Use default router
server.use('/api', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
