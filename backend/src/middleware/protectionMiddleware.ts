import {
  Request,
  Response,
  NextFunction
} from 'express';
import jwt from 'jsonwebtoken';
import User from '../schemas/userSchema.js';
import { IUser } from '../schemas/userSchema.js';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export default protect;
