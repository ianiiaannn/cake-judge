import Bull from 'bull';

import { dbConnection } from '../db-connection';
import { CodeResult } from '../enums/code-result';
import { Language } from '../enums/languages';
import { Output } from '../interfaces/output-interface';
import { Runner } from '../interfaces/runner-interface';
import { Score } from '../schemas/score-schema';
import { testCpp } from './cpp-runner';

const runnerQueue = new Bull('runner', 'redis://redis:6379');

runnerQueue.process(async (job: Bull.Job<any>, done) => {
  switch (job.data.runner.code.language) {
    case Language.Cpp: {
      let result: Output[] = [];
      result = await testCpp(
        job.data.runner.code.code,
        job.data.runner.questions
      );

      console.log(`bull got result: ${result}`);
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
  job.finished().then((output: any) => {
    console.log(`pushJob function got: ${output}`);
    /* if (output.length) {
      const score: Score = {
        submit: runner.code,
        score: 0,
        output: output,
        finalScore: 0,
        finalStatus: CodeResult.SystemError,
      };
      // dbConnection.collection('Scores').insertOne(score);
      console.log(score);
    }*/
  });
}
