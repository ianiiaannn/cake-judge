import { Request, Response } from 'express';
import { dbconn } from '../dbconn';
import { pushJob } from '../runner/runner-loop';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../app';
/**
 * process answer form user.
 * @param {Express.Request} req request
 * @param {Express.Response} res reponse
 */
export function submitAns(req: Request, res: Response) {
  const { token } = req.cookies;
  const { code, language, problemName } = req.body;
  console.log(req.body);
  if (!code || !language || !problemName) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields',
    });
    return;
  }
  dbconn.collection('Problems').findOne({ name: problemName })
    .then((doc: any) => {
      if (!doc) {
        res.status(404).json({
          error: 'Not found.',
        });
        return;
      }
      jwt.verify(token, JWT_SECRET, (error: any, decoded: any) => {
        if (error) {
          res.status(401).json({});
          return;
        }
        console.log(decoded);
      });
    });
  /* const result = pushJob({
    code: { language: language, code: code },
    questions: [],
  });
  console.log(result);*/
};
