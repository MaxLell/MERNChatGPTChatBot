import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COKKIE_NAME } from '../utils/constants.js';

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

    // is this user already registered? -> well we need to do something about this.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send('User already registered');
    }
    // Create a hashed version of the Password to not work with clear-text passwords in the DB
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create new user and save it in the DB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Clear the existing cookie (if there is any already existing)
    res.clearCookie(COKKIE_NAME, {
      domain: 'localhost', // Needs to be fixed when another domain is to be used
      httpOnly: true, // Cookie can not be accessed by anybody
      signed: true, // encrypt the cookie
      path: '/',
    });

    // Create a new cookie
    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COKKIE_NAME, token, {
      path: '/',
      domain: 'localhost', // Needs to be fixed when another domain is to be used
      expires,
      httpOnly: true, // Cookie can not be accessed by anybody
      signed: true, // encrypt the cookie
    });

    // return the status
    console.log(user._id.toString());
    return res.status(201).json({
      message: 'OK',
      id: user._id.toString(),
    });
  } catch (error) {
    // Handle the errors
    console.log(error);
    return res
      .status(418) // I am a Teapot -> The only reasonable error message
      .json({ message: 'ERRORSIS', cause: error.message });
  }
  console.log('userSignup');
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user credentials
    const { email, password } = req.body;

    // Make sure that the user is actually registered here
    const user = await User.findOne({ email }); // MongoDB Access
    if (!user) {
      return res.status(401).send('The email is not registered here');
    }

    // verify the password of the user for authentification purposes
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(403).send('Wrong Password');
    }

    // Clear the existing cookie (if there is any already existing)
    res.clearCookie(COKKIE_NAME, {
      domain: 'localhost', // Needs to be fixed when another domain is to be used
      httpOnly: true, // Cookie can not be accessed by anybody
      signed: true, // encrypt the cookie
      path: '/',
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COKKIE_NAME, token, {
      path: '/',
      domain: 'localhost', // Needs to be fixed when another domain is to be used
      expires,
      httpOnly: true, // Cookie can not be accessed by anybody
      signed: true, // encrypt the cookie
    });

    // All right - the user has successfully jumped over all the trip wire authentification steps -> Yeah
    res.status(200).json({ message: 'Ok', id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res
      .status(418) // I am a Teapot
      .json({ message: 'tiny bugs', cause: error.message });
  }
};
