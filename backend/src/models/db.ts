import mongoose, { Document, Mongoose, Schema } from 'mongoose';
import dotenv from 'dotenv';

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

export const Message = mongoose.model('Message', messageSchema);
export const User = mongoose.model('User', userSchema);

mongoose.connect(url);
