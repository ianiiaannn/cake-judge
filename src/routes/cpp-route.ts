import { pushJob } from '../runner/runner-loop';
import { Submit } from '../interfaces/submit-interface';
import { Language } from '../enums/languages';
import { Request, Response } from 'express';
import { Test } from '../interfaces/test-interface';
/**
 * Cpp runner route.
 * @param {any} req request
 * @param {any} res response
 */
export async function cppRoute(req: Request, res: Response) {
  const testQustions: Test[] = [{
    input: ['world\nnode'],
    output: ['hello, world', 'hello, node'],
    memoryLimit: 10000,
    timeLimit: 10,
    score: 50,
  }, {
    // eslint-disable-next-line max-len
    input: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    // eslint-disable-next-line max-len
    output: ['hello, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    memoryLimit: 10000,
    timeLimit: 10,
    score: 50,
  }];
  const code: Submit = {
    language: Language.Cpp,
    code: req.body.cpp,
  };
  const result = pushJob({ code: code, questions: testQustions });
  console.log(result);
  res.send(result);
}
