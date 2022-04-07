import { dbconn } from '../dbconn';
/**
 * List problems.
 * @param {any} req request
 * @param {any} res response
 */
export function problems(req: any, res: any) {
  dbconn.collection('Problems').find(
    {},
    // eslint-disable-next-line max-len
    { projection: { name: 1, title: 1, reference: 1, difficulty: 1, tags: 1, clickSum: 1, _id: 0 } })
    .limit(100)
    .toArray((err: any, docs: any) => {
      res.json(docs);
    });
}
