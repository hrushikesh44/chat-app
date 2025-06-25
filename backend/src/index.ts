import express from 'express';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';
import messageRoutes from './routes/message';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
dotenv.config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT;
const aws = process.env.AWS_ACCESS_KEY_ID;

app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/mesage', messageRoutes);

async function main() {
  await mongoose.connect(url);
  console.log(url);
  console.log(aws);
  console.log(`connected to mongo db compass`);
  app.listen(port);
  console.log(`listening on port ${port}`);
}

main();
