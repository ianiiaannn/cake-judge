import { dbconn } from '../dbconn';
/**
 * List problems.
 * @param {any} req request
 * @param {any} res response
 */
export function showProblem(req: any, res: any) {
  dbconn.collection('Problems').findOne(
      {},
      // eslint-disable-next-line max-len
      { projection: { name: 1, title: 1, reference: 1, difficulty: 1, tags: 1, clickSum: 1, _id: 0 } })
      .then((docs: any) => {
        res.json(docs);
      });
}

