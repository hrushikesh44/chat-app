import express from 'express';
import { authMiddleware } from '../middleware/loginMiddleware';
import { Message, User } from '../models/db';
import { uploadImage } from './upload';
import { getReceiverSocketId, io } from '../lib/socket';
import { upload } from '../controllers/uploadHandler';

const router = express.Router();

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const users = await User.find({ _id: { $ne: userId } }).select(
      '-password -_id -__v -email -createdAt -updatedAt'
    );
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Internal server error',
    });
  }
});

router.get('/getMessages', authMiddleware, async (req, res) => {
  const email = req.query.email;
  console.log(email);
  const myId = req.userId;

  const sender = await User.findOne({ _id: myId });
  const receiver = await User.findOne({ email: email });
  const receiverId = receiver?._id;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    }).select('text -_id');

    res.status(200).json({
      sender: sender?.fullName,
      receiver: receiver?.fullName,
      messages,
    });
  } catch (e) {
    res.json({
      message: 'Issue while retreiving messages',
    });
  }
});

router.post('/send', authMiddleware, async (req, res) => {
  const text = req.body.text;
  const email = req.body.email;
  const myId = req.userId;
  const receiver = await User.findOne({ email: email });

  console.log(req.body);

  const newMessage = new Message({
    senderId: myId,
    receiverId: receiver?._id,
    text: text,
  });

  await newMessage.save();
  const receiverSocketId = getReceiverSocketId(receiver?._id as any);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }
  res.status(200).json({
    newMessage,
  });
});

router.post('/send/image', authMiddleware, upload.single('file'), uploadImage);

export default router;
