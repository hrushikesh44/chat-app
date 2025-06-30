import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

    next();
  } else {
    res.status(403).json({
      message: 'You are not logged in ',
    });
  }
}

// export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   const rawHeader = req.headers['token'] || req.headers['authorization'];
//   const token =
//     typeof rawHeader === 'string' && rawHeader.startsWith('Bearer ')
//       ? rawHeader.slice(7)
//       : rawHeader;

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token as string, JWT_PASSWORD) as JwtPayload;
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// }
