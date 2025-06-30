import express from 'express';
import { User } from '../models/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/loginMiddleware';

const router = express.Router();
const JWT_PASSWORD = process.env.JWT_PASSWORD;

router.post('/signup', async (req, res) => {
  const requiredBody = z.object({
    email: z.string().email(),
    fullName: z.string().min(8).max(30),
    password: z.string().min(6).max(64),
  });

  const parseBody = requiredBody.safeParse(req.body);

  if (!parseBody.success) {
    res.status(400).json({
      message: 'The credentials you entered were not the correct type',
    });
    return;
  }

  try {
    const { email, fullName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    res.status(200).json({
      message: 'Youve signed up',
    });
  } catch (error) {
    res.status(400).json({
      message: `error while signing up ${error}`,
    });
  }
});

router.post('/signin', async (req, res) => {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(64),
  });

  const parseBody = requiredBody.safeParse(req.body);

  if (!parseBody.success) {
    res.status(401).json({
      message: 'The credentials youve entered are invalid',
    });
  }

  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(400).json({
      message: 'user not found',
    });
  } else {
    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      res.status(400).json({
        message: 'Incorrect password',
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_PASSWORD
      );
      console.log(typeof token);
      res.status(200).json({
        message: 'Youve signed in',
        token: token,
      });
    }
  }
});

router.get('/checkauth', authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (userId) {
    const user = await User.findById(userId).select('-password -updatedAt');
    res.status(200).json({
      userId: userId,
      profilePic: user?.profilePic,
    });
  } else {
    res.status(400).json({
      message: 'Youre not logged in ',
    });
  }
});

router.get('/userDetails', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).select('-password -updatedAt -_id -__v');
  res.json({
    user,
  });
});

export default router;
