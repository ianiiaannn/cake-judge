/* eslint-disable max-len */
import fs from 'fs';
import childProcess from 'child_process';
import os from 'os';
import { CodeResult } from '../enums/code-result';
import { Test } from '../interfaces/test-interface';

/**
 * Test the input code. Note that the input code may execute shell injection.
 * @param {string} input the iputed code
 * @param {array} questions the questions to be tested
 */
export async function testCpp(input: string | NodeJS.ArrayBufferView, questions: Test[]) {
  try {
    fs.writeFileSync('/tmp/test.cpp', input);
    childProcess.execSync('g++ -lstdc++ -o /tmp/test.run /tmp/test.cpp');
  } catch (err) {
    console.log(err);
    return [CodeResult.CompileError, err];
  }
  const resultList: string[] = [];
  try {
    questions.forEach(async (element: Test) => {
      const resultByLine = [];
      const runner = childProcess.spawnSync('/tmp/test.run', {
        input: element.input.join('\n') + os.EOL,
        encoding: 'utf-8',
        timeout: element.timeLimit * 1000,
      });
      let i = 0;
      let output = runner.output[1];
      if (output?.indexOf('\n') != -1) {
        while (output) {
          resultByLine[i] = output.substr(0, output.indexOf('\n'));
          output = output.substr(output.indexOf('\n') + 1, output.length);
          i++;
        }
      } else resultByLine[0] = output;
      let pass = true;
      for (i = 0; i <= resultByLine.length - 1; i++) {
        try {
          if (resultByLine.length) resultByLine[i]?.trim();
          if (element.output[i] != resultByLine[i]) pass = false;
        } catch (err) {
          pass = false;
          console.error(err);
        }
      }
      if (runner.signal) resultList.push(CodeResult.TimeLimitExceeded);
      else if (pass) resultList.push(CodeResult.Accept);
      else resultList.push(CodeResult.WrongAnswer);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log(resultList);
    return resultList;
  }
}
