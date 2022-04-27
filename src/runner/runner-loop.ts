import Bull from 'bull';

import { dbconn } from '../dbconn';
import { Language } from '../enums/languages';
import { Runner } from '../interfaces/runner-interface';
import { testCpp } from './cpp-runner';

const runnerQueue = new Bull('runner', 'redis://redis:6379');

runnerQueue.process(async (job: Bull.Job<any>) => {
  console.log(job.data);
  switch (job.data.runner.code.language) {
    case Language.Cpp: {
      return await testCpp(job.data.runner.code.code, job.data.runner.questions);
    }
  }
});

/**
 * push something into runner queue.
 * @param {Runner} runner runner.
 */
export async function pushJob(runner: Runner) {
  const job = await runnerQueue.add({ runner });
  const result = await job.finished();
  // dbconn.collection('Scores').insertOne({});
  console.log(result);
  return result;
}
