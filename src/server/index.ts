import express from 'express';

export function create() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  return app.set('json spaces', 2);
}
