import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../app';

/**
 * Vaild jwt and return user basic info.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function userInfo(req: Request, res: Response) {
  
}
