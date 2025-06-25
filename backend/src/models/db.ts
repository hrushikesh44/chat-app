import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import { TrustedAdvisor } from 'aws-sdk';

dotenv.config();

const url = process.env.MONGODB_URI;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const messageSchema = new Schema({});

export const User = mongoose.model('User', userSchema);

mongoose.connect(url);
