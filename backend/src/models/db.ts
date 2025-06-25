import mongoose, { Document, Mongoose, Schema } from 'mongoose';
import dotenv from 'dotenv';
import { TrustedAdvisor } from 'aws-sdk';

dotenv.config();

const url = process.env.MONGODB_URI;

export interface UserDocument extends Document {
  email: String;
  fullName: String;
  password: String;
  profilePic: String;
}

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

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: 'User',
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: 'User',
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
});

export const Message = mongoose.model<UserDocument>('Message', messageSchema);
export const User = mongoose.model('User', userSchema);

mongoose.connect(url);
