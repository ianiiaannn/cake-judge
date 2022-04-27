import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../app';
import { dbconn } from '../dbconn';
import { pushJob } from '../runner/runner-loop';
import { Problems } from '../schemas/problems-schema';

/**
 * process answer form user.
 * @param {Express.Request} req request
 * @param {Express.Response} res reponse
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
  dbconn.collection('Problems').findOne({ name: problemid })
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
        pushJob({
          code: { language: language, code: code },
          questions: problem.test,
        });
      });
    });
};
