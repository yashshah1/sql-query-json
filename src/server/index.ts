import express from 'express';

export function create(): express.Application {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
    console.log(req.query);
    res.json(app.get('db').get());
  });
  return app.set('json spaces', 2);
}
