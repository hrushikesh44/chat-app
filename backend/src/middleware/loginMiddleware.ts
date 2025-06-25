import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/db';

const JWT_PASSWORD = process.env.JWT_PASSWORD;

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['token'];
  const decoded = jwt.verify(header as string, JWT_PASSWORD);

  if (decoded) {
    if (typeof decoded === 'string') {
      res.status(403).json({
        message: 'You are not logged in',
      });
      return;
    }
    req.userId = (decoded as JwtPayload).id;
    console.log(req.userId);
    next();
  } else {
    res.status(403).json({
      message: 'You are not logged in ',
    });
  }
}
