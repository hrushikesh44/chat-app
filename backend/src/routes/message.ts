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
      '-password -email -__v -createdAt -updatedAt'
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
  const id = req.query.userId;
  const myId = req.userId;
  console.log('getmessages', id);

  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    });

    res.status(200).json({
      sender: myId,
      receiver: id,
      messages,
    });
  } catch (e) {
    res.json({
      message: 'Issue while retreiving messages',
    });
  }
});

router.post('/send', authMiddleware, async (req, res) => {
  try {
    const text = req.body.text;
    const id = req.query.userId;
    const myId = req.userId;
    console.log('query', id);

    if (!text || !id) {
      res.status(400).json({
        message: 'text or receiver id is missing',
      });
      return;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: id,
      text: text,
    });

    await newMessage.save();
    //@ts-ignore
    const receiverSocketId = getReceiverSocketId(id);
    console.log('receiverid', receiverSocketId);

    if (receiverSocketId) {
      console.log('reached 1');
      io.to(receiverSocketId).emit('newMessage', newMessage);
      console.log('message sent', newMessage);
    }
    res.status(200).json({
      newMessage,
    });
  } catch (err) {
    res.json({
      message: 'failed to send message',
    });
  }
});

router.post('/send/image', authMiddleware, upload.single('file'), uploadImage);

export default router;
