import { NextFunction, Request, Response } from 'express';
import { Message, User } from '../models/db';

export const uploadProfileImage = async (req: Request, res: Response) => {
  const file = req.file as Express.MulterS3.File;
  res.json({
    message: 'Image uploaded successfully',
    imageUrl: file.location,
  });
  await User.updateOne({
    $set: {
      profilePic: file.location,
    },
  });
};

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file as Express.MulterS3.File;
  res.json({
    message: 'Image uploaded successfully',
    imageUrl: file.location,
  });
  await Message.updateOne({
    $set: {
      image: file.location,
    },
  });
  (req.imageUrl = file.location), next();
};
