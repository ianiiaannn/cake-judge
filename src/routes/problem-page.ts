import { Request, Response } from 'express';

import { dbConnection } from '../db-connection';

/**
 * Problem page api.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function showProblem(req: Request, res: Response) {
  console.log(req.query);
  dbConnection.collection('Problems').findOne(
    { name: req.query.name },
    { projection: { name: 1, title: 1, reference: 1, difficulty: 1, tags: 1, clickSum: 1, _id: 0, owner_ID: 1, content: 1, theInput: 1, theOutput: 1, sampleInput: 1, sampleOutput: 1, hint: 1, submitSum: 1 } })
    .then((docs: any) => {
      if (docs) {
        res.json(docs);
        dbConnection.collection('Problems').updateOne(
          { name: req.query.name },
          { $inc: { clickSum: 1 } },
        );
        return;
      }
      res.sendStatus(404);
    }).catch((error: any) => {
      console.error(error);
    });
}

