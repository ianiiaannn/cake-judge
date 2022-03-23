import { testCpp } from '../runner/cpp-runner';
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

  testCpp(req.body.cpp, testQustions).then((result: any) => {
    res.render('result', { output: JSON.stringify(result) });
  });
  /*
  // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  const codeRunner = new workerThreads.Worker(
    __dirname + '../runner/cpp-runner.js');
  codeRunner.postMessage({
    d
  });
  codeRunner.on('message', (result: string) => {
    res.render('result', { output: JSON.stringify(result) });
  }); */
}
