import workerThreads from 'worker_threads';
import fs from 'fs';
import childProcess from 'child_process';


console.log('a');

// eslint-disable-next-line require-jsdoc
async function testCpp(input, questions) {
  try {
    fs.writeFileSync('/tmp/test.cpp', input);
    childProcess.execSync('gcc -lstdc++ -o /tmp/test.run /tmp/test.cpp');
  } catch (err) {
    console.log(err);
    message=err;
  } try {
    questions.forEach(async (element) =>{
      const runner = childProcess.spawnSync('/tmp/test.run', {
        input: element.input,
        encoding: 'utf-8',
      });
      console.log(runner.output);
      // workerThreads.parentPort.postMessage(runner.output);
    });
  } catch (err) {
    console.error(err);
  }
}

workerThreads.parentPort.on('message', (message)=>{
  console.log('b');
  console.log(message);
  testCpp(message.code, message.testData);
});
