import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../app';
import { dbConnection } from '../db-connection';
import { pushJob } from '../runner/runner-loop';
import { Problems } from '../schemas/problems-schema';

/**
 * process answer form user.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function submitAns(req: Request, res: Response) {
  const { token } = req.cookies;
  const { code, language, problemid } = req.body;
  if (!code || !language || !problemid) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields',
    });
    return;
  }
  dbConnection.collection('Problems').findOne({ name: problemid })
    .then((doc: any) => {
      const problem = doc as Problems;
      if (!problem) {
        res.status(404).json({
          error: 'Not found.',
        });
        return;
      }
      jwt.verify(token, JWT_SECRET, (error: any, decoded: any) => {
        if (error || !decoded) {
          res.status(401).json({});
          return;
        }
        res.status(201).json({});
        dbConnection.collection('Problems').updateOne(
          { name: problemid },
          { $inc: { submitSum: 1 } },
        );
        pushJob({
          code: { language: language, code: code },
          questions: problem.test,
          user: decoded.username,
        });
      });
    });
};
