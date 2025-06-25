import express from 'express';
import { authMiddleware } from '../middleware/loginMiddleware';
import { User } from '../models/db';

const router = express.Router();

router.get('/users', authMiddleware, async (req, res): Promise<void> => {
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

export default router;
