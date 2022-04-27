import childProcess from 'child_process';
import fs from 'fs';
import os from 'os';

import { CodeResult } from '../enums/code-result';
import { Output } from '../interfaces/output-interface';
import { Test } from '../interfaces/test-interface';
import { watchDog } from './watchdog';

/**
 * Test the input code. Note that the input code may execute shell injection.
 * @param {string} input the iputed code
 * @param {array} questions the questions to be tested
 */
export async function testCpp(input: string, questions: Test[]) {
  try {
    fs.writeFileSync('/tmp/test.cpp', input);
    childProcess.execSync('g++ -lstdc++ -o /tmp/out.a /tmp/test.cpp');
  } catch (err) {
    console.log(err);
    return [CodeResult.CompileError, err];
  }
  const resultList: Output[] = [];
  try {
    questions.forEach((element) => {
      let outputObj: Output = {
        timeUseage: 0,
        memoryUseage: 0,
        status: CodeResult.SystemError,
      };
      const childStdout: string[] = [];
      const runner = childProcess.spawn('/tmp/out.a', [], {
        stdio: ['pipe', 'pipe'],
        timeout: element.timeLimit * 1000,
      });
      runner.stdin?.write(element.input.join('\n') + os.EOL);
      runner.stdin?.end();
      console.log('before');
      console.log(runner.pid as number);
      outputObj = watchDog(runner.pid as number, outputObj);
      console.log('after');
      runner.stdout?.on('data', async (data: string) => {
        data.toString().split(os.EOL).forEach((line: string) => {
          childStdout.push(line);
        });
      });
      runner.on('close', (code, singal: NodeJS.Signals) => {
        let pass = true;
        let i = 0;
        if (element.output.length && childStdout.length) {
          if (childStdout[childStdout.length - 1] === '') {
            childStdout.pop();
          }
          while (element.output.length >= i && childStdout.length >= i) {
            if (element.output[i] !== childStdout[i]) {
              pass = false;
              break;
            }
            i++;
          }
        }
        if (outputObj.status === CodeResult.SystemError) {
          if (code !== 0) {
            outputObj.status = CodeResult.TimeLimitExceeded;
          } else if (pass) {
            outputObj.status = CodeResult.Accepted;
          } else {
            outputObj.status = CodeResult.WrongAnswer;
          }
        }
        console.log(outputObj);
        resultList.push(outputObj);
      });
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log(resultList);
    return resultList;
  }
}
