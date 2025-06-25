import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_PASSWORD = process.env.JWT_PASSWORD;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['token'];

  const response = jwt.verify(header as string, JWT_PASSWORD);

  if (response) {
    if (typeof response === 'string') {
      res.status(400).json({
        message: 'Session timed out login again',
      });
    }

    req.userId = (response as JwtPayload)._id;
    next();
  } else {
    res.status(400).json({
      message: 'Session timed out login again',
    });
  }
}
