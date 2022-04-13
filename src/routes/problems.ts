import { dbconn } from '../dbconn';
import { Request, Response } from 'express';
/**
 * List problems.
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 */
export function problems(req: Request, res: Response) {
  let query: string = '.';
  if (req.query.query as string !== 'undefined') {
    query=req.query.query as string;
  }
  console.log(query);
  dbconn.collection('Problems').find(
    {
      $or: [
        { name: { $regex: query } },
      ],
    },
    // eslint-disable-next-line max-len
    { projection: { name: 1, title: 1, reference: 1, difficulty: 1, tags: 1, clickSum: 1, _id: 0 } })
    .limit(100)
    .toArray((err: any, docs: any) => {
      res.json(docs);
    });
}
