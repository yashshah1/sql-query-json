import express from 'express';
import { Parser } from 'node-sql-parser';

const parser = new Parser();

export function create(): express.Application {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
    const { q: query } = req.query;
    if (!query) return res.sendStatus(404);

    const ast = parser.astify(query as string);

    res.status(200).json(ast);
  });
  return app.set('json spaces', 2);
}
