import { UserDocument } from '../models/db';

export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: String;
      user?: UserDocument;
      imageUrl?: String;
    }
  }
}
