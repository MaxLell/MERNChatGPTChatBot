import { NextFunction, Request, Response } from 'express';
import {
  body,
  ValidationChain,
  validationResult,
} from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        // Error occured -> result is not empty
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Email is required'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password should contain more then 6 chars'),
];

export const signUpValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  ...loginValidator,
];

export const chatCompetionValidator = [
  body('message').notEmpty().withMessage('Name is required'),
  ...loginValidator,
];
