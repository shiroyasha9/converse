import express, { Request, Response } from 'express';

import { version } from '../package.json';

const app = express();

app.get('/', (_: Request, res: Response) =>
  res.send(`Server is up and running version ${version}`)
);
