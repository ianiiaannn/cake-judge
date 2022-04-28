/* eslint-disable indent */
import { dbconn } from '../dbconn';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { COOKIE_AGE, JWT_EXPIRE, JWT_SECRET, SALT_WORK_FACTORY } from '../app';
import { Users } from '../schemas/users-schema';
import { Roles } from '../enums/roles';
import { Language } from '../enums/languages';
import jwt from 'jsonwebtoken';

/**
 * register route
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function register(req: Request, res: Response) {
  const { username, password, email, displayName } = req.body;
  console.log(req.body);
  if (!username || !displayName || !password || !email) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields',
    });
    return;
  }
  dbconn.collection('Users').findOne({
    $or: [{ username: username }, { email: email }],
    })
    .then((doc: any) => {
      if (doc) {
        res.status(409).json({
          error: 'Conflict',
          message: 'Account already exists',
        });
        return;
      }
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTORY);
      const hash = bcrypt.hashSync(password, salt);
      if (!hash) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to hash password',
        });
        return;
      }
      const user: Users = {
        username,
        displayName,
        email,
        hash,
        salt,
        role: Roles.Student,
        registerTime: new Date(),
        registerIP: req.ip,
        lastLogin: new Date(),
        ipSet: [req.ip],
        userLanguage: 'en',
        codeLanguage: Language.Cpp,
        ac: 0,
        wa: 0,
        tle: 0,
        mle: 0,
        ole: 0,
        re: 0,
        ce: 0,
        se: 0,
      };
      dbconn.collection('Users').insertOne(user)
        .then(() => {
          const token= jwt.sign({
            username: user.username,
            role: user.role,
          }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
          });
          res.status(201).cookie('token', token, {
            httpOnly: true,
            maxAge: COOKIE_AGE,
            }).json({
              message: 'Account created',
              });
        })
        .catch((err: any) => {
          res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to create account',
          });
        });
    });
}
