import { dbconn } from '../dbconn';
/**
 * List problems.
 * @param {any} req request
 * @param {any} res response
 */
export function problems(req: any, res: any) {
  dbconn.db.collection('Problems').find({}).toArray((err, docs) => {
    res.json(docs);
  });
}
