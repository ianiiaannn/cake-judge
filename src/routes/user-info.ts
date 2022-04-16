import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../app';

/**
 * Vaild jwt.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function userInfo(req: Request, res: Response) {
  console.log(req.cookies);
  const {token}=req.cookies;
  jwt.verify(token, JWT_SECRET, (error: any, decoded: any) => {
    if (error) {
      res.status(401).json({});
      return;
    }
    res.json(decoded);
  });
}
