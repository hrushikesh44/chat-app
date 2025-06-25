import express, { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/loginMiddleware';
import { User } from '../models/db';

dotenv.config();

const app = express();
const router = express.Router();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION!,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',
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

router.post('/upload', authMiddleware, upload.single('image'), async (req: Request, res) => {
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
});

export default router;
