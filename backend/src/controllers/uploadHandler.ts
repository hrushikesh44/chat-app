import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/loginMiddleware';
import { uploadProfileImage } from '../routes/upload';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION!,
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: any, metadata?: any) => void
    ) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: any, metadata?: any) => void
    ) {
      const uniqueSuffix = Date.now().toString();
      cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

router.post('/upload/profilepic', authMiddleware, upload.single('file'), uploadProfileImage);

export default router;
