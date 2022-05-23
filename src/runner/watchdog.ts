import pidUsage from 'pidusage';

import { Output } from '../interfaces/output-interface';

/**
 * watch resource usage of runner.
 * @return {Output} output object
 * @param {number} pid pid to watch
 * @param {Output} outputObj output object
 */
export function watchDog(pid: number, outputObj: Output): Output {
  setInterval(() => {
    pidUsage(pid as number, (err, docs: pidUsage.Status) => {
      if (err) {
        clearInterval();
        return outputObj;
      }
      if (docs.memory > outputObj.memoryUsage) {
        outputObj.memoryUsage = docs.memory;
      }
      if (docs.elapsed > outputObj.timeUsage) {
        outputObj.timeUsage = docs.elapsed;
      }
    });
  }, 10);
  return outputObj;
}
