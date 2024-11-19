import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/', (req: Request, res: Response) => {
  console.log(req)
});

app.listen(port, () => {
  console.log(`[Server]: Server is running on port ${port}`);
});