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
 * @param {Express.Response} res resonse
 */
export function register(req: Request, res: Response) {
  const { account, password, email, displayName } = req.body;
  if (!account || !displayName || !password || !email) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields',
    });
    return;
  }
  dbconn.collection('Users').findOne({
    account: account,
    email: email,
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
        account,
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
            account: user.account,
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
/**
  const array = req.body.username.replace(/[^0-9a-z]/gi, '');
  if (array != '' && req.body.password != '') {
    dbconn.collection('Users').findOne({ username: array }, (err, user) => {
      if (err) console.log(err);
      else if (user) {
        req.session.handlerCode = 'failRegister';
        res.redirect('/');
      } else {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTORY);
        dbconn.collection('Users').insertOne({
          username: array,
          password: bcrypt.hashSync(req.body.password, salt),
          salt: salt,
          carbonLog: 0,
        }, (err, user) => {
          if (err) console.log(err);
          else {
            req.session.username = array;
            req.session.handlerCode = 'successRegister';
            console.log(user + ' register');
            res.redirect('/');
          }
        });
      }
    });
  };
  */
