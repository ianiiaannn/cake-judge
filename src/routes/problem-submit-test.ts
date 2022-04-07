/* eslint-disable max-len */
import { dbconn } from '../dbconn';

/**
 * submit test problem.
 */
export function problemSubmitTest() {
  dbconn.db.collection('Problems').deleteMany({});
  dbconn.db.collection('Problems').insertOne({
    name: 'test',
    title: 'Test Problem',
    owner_ID: null,
    content: '測試問題',
    theInput: '一字串',
    theOutput: 'hello, 字串',
    sampleInput: 'ian',
    sampeOutput: 'hello, ian',
    hint: null,
    sampleCode: {
      language: 'cpp',
      code:
        `#include <iostream>
        using namespace std;
        int main() {
          string s;
          cin >> s;
          cout << "hello, " << s << endl;
          return 0;
        }`,
    },
    comment: 'test',
    judgeMode: 'test',
    test: [
      {
        input: ['world', 'node'],
        output: ['hello, world', 'hello, node'],
        score: 50,
        timeLimit: 100,
        memoryLimit: 100,
      },
      {
        input: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
        output: ['hello, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
        score: 50,
        timeLimit: 100,
        memoryLimit: 100,
      },
    ],
    difficulty: 1,
    submitSum: 1,
    clickSum: 1,
    acSum: 1,
    reference: ['test', '@ianiiaannn'],
    tags: ['test', 'I/O'],
    dispaly: true,
    problemSettings: {
      waVisable: true,
    },
  }).then(() => {
    console.log('Inserted test problem');
  });
}

