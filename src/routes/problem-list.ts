import { Request, Response } from 'express';

import { dbConnection } from '../db-connection';

/**
 * List problems.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function problemList(req: Request, res: Response) {
  let query: string = '.';
  if (req.query.query as string !== 'undefined') {
    query=req.query.query as string;
  }
  dbConnection.collection('Problems').find(
    {
      $or: [
        { name: { $regex: query } },
        { title: { $regex: query } },
        { reference: { $regex: query } },
        { tags: { $regex: query } },
        { _id: { $regex: query } },
      ],
    },
    { projection: { name: 1, title: 1, reference: 1, difficulty: 1, tags: 1, clickSum: 1, _id: 0 } })
    .limit(100)
    .toArray((err: any, docs: any) => {
      res.json(docs);
    });
}
