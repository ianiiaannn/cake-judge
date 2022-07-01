import childProcess from 'child_process';
import diff from 'diff';
import fs from 'fs';
import os from 'os';

import { CodeResult } from '../enums/code-result';
import { Output } from '../interfaces/output-interface';
import { Test } from '../interfaces/test-interface';
import { watchDog } from './watchdog';

/**
 * Test the input code. Note that the input code may execute shell injection.
 * @param {string} input the input code
 * @param {array} questions the questions to be tested
 * @return {Promise<Output[]>} promise of output
 */
export function testCpp(input: string, questions: Test[]): Promise<Output[]> {
  return new Promise((resolve) => {
    const resultList: Output[] = [];
    try {
      fs.writeFileSync('/tmp/test.cpp', input);
      childProcess.execSync('g++ -lstdc++ -o /tmp/out.a /tmp/test.cpp');
    } catch (err) {
      console.log(err);
      resultList.push({ status: CodeResult.CompileError } as Output);
      resolve(resultList);
    }
    try {
      questions.forEach((element: Test) => {
        setTimeout(() => {
          let outputObj: Output = {
            timeUsage: 0,
            memoryUsage: 0,
            status: CodeResult.SystemError,
          };
          const childStdout: string[] = [];
          const runner = childProcess.spawn('/tmp/out.a', [], {
            stdio: ['pipe', 'pipe'],
            timeout: element.timeLimit,
          });
          runner.stdin?.write(element.input.join('\n') + os.EOL);
          runner.stdin?.end();
          console.log(runner.pid as number);
          outputObj = watchDog(runner.pid as number, outputObj);
          runner.stdout?.on('data', (data: string) => {
            data
              .toString()
              .split(os.EOL)
              .forEach((line: string) => {
                childStdout.push(line);
              });
          });
          runner.on('close', (code, signal: NodeJS.Signals) => {
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
              if (
                signal === 'SIGSEGV' ||
                signal === 'SIGBUS' ||
                signal === 'SIGFPE'
              ) {
                outputObj.status = CodeResult.RuntimeError;
              } else if (
                code !== 0 ||
                element.timeLimit < outputObj.timeUsage
              ) {
                outputObj.status = CodeResult.TimeLimitExceeded;
              } else if (pass) {
                outputObj.status = CodeResult.Accepted;
              } else {
                outputObj.status = CodeResult.WrongAnswer;
                outputObj.outputDiff = diff
                  .diffWordsWithSpace(
                    element.output.join('\n'),
                    childStdout.join('\n')
                  )
                  .toString()
                  .slice(0, 50);
              }
            }
            resultList.push(outputObj);
          });
        }, element.timeLimit * 1.5);
      });
    } catch (err) {
      console.error(err);
    }
    const timerId = setInterval(() => {
      if (resultList.length === questions.length) {
        console.log(`Runner return: ${JSON.stringify(resultList)}`);
        clearInterval(timerId);
        resolve(resultList);
      }
    }, 10);
  });
}
