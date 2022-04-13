/* eslint-disable indent */
import { dbconn } from '../dbconn';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { COOKIE_AGE, JWT_EXPIRE, JWT_SECRET } from '../app';
/**
 * Login route. Queue database and send jwt token.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function login(req: Request, res: Response) {
  const { account, password } = req.body;
  if (!account || !password) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields',
    });
    return;
  }
  dbconn.collection('Users').findOne({
    $or: [{ account: account }, { email: account }],
  })
    .then((doc: any) => {
      if (!doc) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Account or password is incorrect',
        });
        return;
      }
      if (!bcrypt.compareSync(password, doc.hash)) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Account or password is incorrect',
        });
        return;
      }
      const token = jwt.sign({
        account: doc.account,
        role: doc.role,
      }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });
      res.cookie('token', token, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
      });
      res.status(200).json({
        message: 'Login successful',
      });
    });
}
