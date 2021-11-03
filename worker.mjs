import workerThreads from 'worker_threads';
import fs from 'fs';
import childProcess from 'child_process';


console.log('a');

// eslint-disable-next-line require-jsdoc
async function testCpp(input, questions) {
  let message;
  try {
    fs.writeFileSync('/tmp/test.cpp', input);
    childProcess.execSync('gcc -lstdc++ -o /tmp/test.run /tmp/test.cpp');
  } catch (err) {
    console.log(err);
    message=err;
  }
  const resultList=[];
  if (!message) {
    try {
      questions.forEach(async (element) =>{
        const resultByLine=[];
        const runner = childProcess.spawnSync('/tmp/test.run', {
          input: element.input,
          encoding: 'utf-8',
        });
        let i=0;
        let output=runner.output[1];
        while (output) {
          resultByLine[i]=output.substr(0, output.indexOf('\n'));
          output=output.substr(output.indexOf('\n')+1, output.length);
          i++;
        }
        i=0;
        let pass=true;
        for (let i=0; i<=element.output.length-1; i++) {
          console.log(element.output);
          resultByLine[i].trim();
          if (element.output[i] != resultByLine[i]) pass=false;
        }
        if (pass) resultList.push('AC');
        if (runner.signal)resultList.push('TLE');
        // workerThreads.parentPort.postMessage(runner.output);
      });
    } catch (err) {
      console.error(err);
    } finally {
      workerThreads.parentPort.postMessage(resultList);
    }
  } else {
    workerThreads.parentPort.postMessage('CE');
  }
}

workerThreads.parentPort.on('message', (message)=>{
  testCpp(message.code, message.testData);
});
