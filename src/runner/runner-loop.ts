/* eslint-disable max-len */
import { testCpp } from './cpp-runner';
import Bull from 'bull';

const runnerQueue = new Bull('runner');

/**
 * push something into runner queue.
 * @param {any} runner runner.
 */
export function pushJob(runner: any) {
  const job=runnerQueue.add({runner});
  console.log(job);
  job.then((result) => {
    console.log('job done');
    console.log(result);
    return result;
  });
}

runnerQueue.process((job: any, done: any) => {
  switch (job.code.language) {
    case 'cpp': {
      testCpp(job.code.code, job.testQustions).then((result: any) => {
        console.log('process done');
        console.log(result);
        return Promise.resolve(result);
      });
    }
  }
});
