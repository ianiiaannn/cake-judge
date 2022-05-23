import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { COOKIE_AGE, JWT_EXPIRE, JWT_SECRET } from '../app';
/* eslint-disable indent */
import { dbConnection } from '../db-connection';

/**
 * Login route. Queue database and send jwt token.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields',
    });
    return;
  }
  dbConnection.collection('Users').findOne({
    $or: [{ username: username }],
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
        username: doc.username,
        role: doc.role,
      }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });
      res.cookie('token', token, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
      });
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
      });
    });
}
