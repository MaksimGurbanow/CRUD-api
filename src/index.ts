import 'dotenv/config'
import type { Express } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import { router as productRouter }  from './routes/product';
import { router as userRouter }  from './routes/user';

const { PORT, DB_LINK }: { PORT: string | number, DB_LINK: string } = process.env as { PORT: string | number, DB_LINK: string };
const app: Express = express();

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  // console.group('Client connected');
  // console.log(`Query parameters: ${JSON.stringify(req.query)}`);
  // console.groupEnd();

  res.send();
})

mongoose.connect(DB_LINK)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT || 3000, () => {
    console.log('Started listening');
  });
})
.catch(() => {
  console.log('Error occured');
})
