import Bull from 'bull';

import { dbConnection } from '../db-connection';
import { CodeResult } from '../enums/code-result';
import { Language } from '../enums/languages';
import { Output } from '../interfaces/output-interface';
import { Runner } from '../interfaces/runner-interface';
import { Problems } from '../schemas/problems-schema';
import { Score } from '../schemas/score-schema';
import { cppTestRunner } from './cpp-runner';

const runnerQueue = new Bull('runner', 'redis://redis:6379');

runnerQueue.process(async (job: Bull.Job<any>, done) => {
  switch (job.data.runner.code.language) {
    case Language.Cpp: {
      let result: Output[] = [];
      result = await cppTestRunner(
        job.data.runner.code.code,
        job.data.runner.questions,
      );
      done(null, result);
    }
  }
});

/**
 * push something into runner queue.
 * @param {Runner} runner runner.
 */
export async function pushJob(runner: Runner) {
  const job = await runnerQueue.add({ runner });
  job.finished().then((output: Output[]) => {
    if (output.length) {
      const score: Score = {
        userID: runner.userID,
        problemID: runner.problemId,
        submit: runner.code,
        output: output,
        finalScore: 0,
        finalStatus: CodeResult.SystemError,
      };
      dbConnection.collection('Problems').findOneAndUpdate({ _id: runner.problemId },
        { $inc: { submitSum: 1 } },
      ).then((doc: any) => {
        const problem: Problems = doc.value as Problems;
        if (output[0].status === CodeResult.SystemError) {
          score.finalStatus = CodeResult.SystemError;
        } else if (output[0].status === CodeResult.CompileError) {
          score.finalStatus = CodeResult.CompileError;
        } else {
          score.output.forEach((element: Output, index: number) => {
            if (element.status === CodeResult.Accepted) {
              score.finalScore += problem.test[index].score;
            }
          });
          if (score.finalScore >= problem.requireScore) {
            score.finalStatus = CodeResult.Accepted;
          } else {
            score.finalStatus = CodeResult.WrongAnswer;
          }
        }
      });
      dbConnection.collection('Scores').insertOne(score);
      console.log(score);
    }
  });
}
