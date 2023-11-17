import jwt from 'jsonwebtoken';
import { COKKIE_NAME } from './constants.js';
import { NextFunction, Request, Response } from 'express';
import { log } from 'console';

export const createToken = (
  id: string,
  email: string,
  expiresIn: string
) => {
  const payload = {
    id,
    email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COKKIE_NAME}`];
  if (!token || token.trim === '') {
    return res.status(401).json({ message: 'token not received' });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      (error, success) => {
        if (error) {
          reject(error.message);
          return res.status(401).json({ message: 'Token expired' });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      }
    );
  });
};
