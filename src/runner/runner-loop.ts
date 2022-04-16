/* eslint-disable max-len */
import { testCpp } from './cpp-runner';
import Bull from 'bull';
import { Runner } from '../interfaces/runner-interface';

const runnerQueue = new Bull('runner', 'redis://redis:6379');

runnerQueue.process(async (job: any, done: any) => {
  console.log(job.data);
  switch (job.data.runner.code.language) {
    case 'cpp': {
      return await testCpp(job.data.runner.code.code, job.data.runner.testQustions);
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
  console.log(result);
  return result;
}
