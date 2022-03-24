import { testCpp } from '../runner/cpp-runner';
import { pushJob } from '../runner/runner-loop';
/**
 * Cpp runner route.
 * @param {any} req request
 * @param {any} res response
 */
export function cppRoute(req: any, res: any) {
  const testQustions: any = [{
    input: 'world\nnode',
    output: ['hello, world', 'hello, node'],
    memLimit: '10000',
    timeout: '10',
  }, {
    // eslint-disable-next-line max-len
    input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    // eslint-disable-next-line max-len
    output: ['hello, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    memLimit: '10000',
    timeout: '10',
  }];
  const code: any = {
    language: 'cpp',
    code: req.body.cpp,
  };
  res.render('result', { output: pushJob({ code, testQustions }) });
  /* testCpp(req.body.cpp, testQustions).then((result: any) => {
    res.render('result', { output: JSON.stringify(result) });
  });
  */
}
