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
    const filteredId = await User.find({ _id: { $ne: userId } }).select('-password');
    res.status(200).json(filteredId);
  } catch (error) {
    res.status(400).json({
      message: 'Internal server error',
    });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  const receiverId = req.params;
  const myId = req.userId;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    res.status(200).json({
      message: 'your messages',
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
  const receiverId = req.body.receiverId;
  const myId = req.userId;

  console.log(req.body);

  const newMessage = new Message({
    senderId: myId,
    receiverId: receiverId,
    text: text,
  });

  await newMessage.save();
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }
  res.status(200).json({
    newMessage,
  });
});

router.post('/send/image', authMiddleware, upload.single('file'), uploadImage);

export default router;
