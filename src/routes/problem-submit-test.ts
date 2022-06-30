/* eslint-disable max-len */
import { dbConnection } from '../db-connection';
import { Problems } from '../schemas/problems-schema';

/**
 * submit test problem.
 */
export function problemSubmitTest() {
  dbConnection.db.collection('Problems').findOne({}).then((docs: any) => {
    if (!docs) {
      dbConnection.db.collection('Problems').deleteMany({});
      dbConnection.db
        .collection('Problems')
        .insertOne({
          name: 'test',
          title: 'Test Problem',
          owner_ID: undefined,
          content: '測試問題',
          theInput: '一字串',
          theOutput: 'hello, 字串',
          sampleInput: 'ian',
          sampleOutput: 'hello, ian',
          hint: undefined,
          sampleCode: {
            language: 'cpp',
            code: `#include <iostream>
              using namespace std;int main() {string s;cin >> s;cout << "hello, " << s << endl;return 0;}`,
          },
          comment: 'test',
          judgeMode: 'test',
          test: [
            {
              input: ['world', 'node'],
              output: ['hello, world', 'hello, node'],
              score: 50,
              timeLimit: 1000,
              memoryLimit: 100,
              required: true,
            },
            {
              input: [
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              ],
              output: [
                'hello, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              ],
              score: 50,
              timeLimit: 1000,
              memoryLimit: 100,
              required: true,
            },
          ],
          difficulty: 1,
          submitSum: 1,
          clickSum: 1,
          acSum: 1,
          reference: ['test', '@ianiiaannn'],
          tags: ['test', 'I/O'],
          display: true,
          problemSettings: {
            waVisible: true,
          },
        } as Problems)
        .then(() => {
          console.log('Inserted test problem');
        });
    }
  });
}
