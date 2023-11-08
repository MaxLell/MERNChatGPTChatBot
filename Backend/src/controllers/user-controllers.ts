import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';

/**
 * Get all users from the Database
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // When no argument is provided in the find function, all records are `found`
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: 'ERROR', cause: error.message });
  }
};
