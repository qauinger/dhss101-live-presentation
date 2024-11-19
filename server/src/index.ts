import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.raw({ type: '*/*', limit: '10mb' }));

app.post('/', (req: Request, res: Response) => {
  console.log(req.body.toString('utf-8'));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`[Server]: Server is running on port ${port}`);
});