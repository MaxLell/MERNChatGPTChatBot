import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { hash } from 'bcrypt';

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
      .status(418) // I am a Teapot
      .json({ message: 'ERROR', cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract Details from the Request Body
    const { name, email, password } = req.body;

    // Create a hashed version of the Password to not work with clear-text passwords in the DB
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create new user and save it in the DB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // return the status
    console.log(user._id.toString());
    return res.status(201).json({
      message: 'OK',
      id: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(418) // I am a Teapot
      .json({ message: 'ERRORSIS', cause: error.message });
  }
  console.log('userSignup');
};
