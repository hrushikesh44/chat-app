import { NextFunction, Request, Response } from 'express';
import { Message, User } from '../models/db';

export const uploadProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file as Express.MulterS3.File;
  const userId = req.userId;
  const data = await User.updateOne({ _id: userId }, { $set: { profilePic: file.location } });
  console.log(data);
  res.json({
    message: 'Image uploaded successfully',
    imageUrl: file.location,
  });
};

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file as Express.MulterS3.File;
  const userId = req.userId;
  await Message.findByIdAndUpdate({
    userId,
    image: file.location,
  });
  res.json({
    message: 'Image uploaded successfully',
    imageUrl: file.location,
  });

  (req.imageUrl = file.location), next();
};
