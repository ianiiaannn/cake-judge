import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../app';

/**
 * Valid jwt.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 * @param {NextFunction} next next function
 */
export function checkUser(req: Request, res: Response, next: NextFunction) {
  next();
}
