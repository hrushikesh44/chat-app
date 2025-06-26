import express from 'express';
import authRoutes from './routes/auth';
import uploadRoutes from './controllers/uploadHandler';
import messageRoutes from './routes/message';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT;
const aws = process.env.AWS_ACCESS_KEY_ID;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/message', messageRoutes);

async function main() {
  await mongoose.connect(url);
  console.log(url);
  console.log(aws);
  console.log(`connected to mongo db compass`);
  app.listen(port);
  console.log(`listening on port ${port}`);
}

main();
