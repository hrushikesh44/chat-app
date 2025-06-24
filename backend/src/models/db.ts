import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;

const userSchema = new Schema({
  username: String,
  password: String,
});

mongoose.connect(url);
