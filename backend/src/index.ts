import express from 'express';
import authRoutes from './routes/auth';
import uploadRoutes from './controllers/uploadHandler';
import messageRoutes from './routes/message';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { app, server } from './lib/socket';

app.use(express.json());
dotenv.config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT;

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
  console.log(`connected to mongo db compass`);
  server.listen(port);
  console.log(`listening on port ${port}`);
}

main();
