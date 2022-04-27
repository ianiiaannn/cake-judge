import pidUsage from 'pidusage';

import { Output } from '../interfaces/output-interface';

/**
 * watch resorce usage of runner.
 * @return {Output} output object
 * @param {number} pid pid to watch
 * @param {Output} outputObj output object
 */
export function watchDog(pid: number, outputObj: Output) {
  pidUsage(pid as number, (err, docs: pidUsage.Status) => {
    console.log(docs);
    console.log(err);
    if (err) {
      return outputObj;
    }
    if (docs.memory > outputObj.memoryUseage) {
      outputObj.memoryUseage = docs.memory;
    }
    if (docs.elapsed > outputObj.timeUseage) {
      outputObj.timeUseage = docs.elapsed;
    }
    setTimeout(watchDog, 10);
  });
  return outputObj;
}
