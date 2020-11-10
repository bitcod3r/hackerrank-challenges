'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});


process.stdin.on('end', function(inputStdin) {
  inputString += inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'processLogs' function to read every 
 * element of 'logs' variable and count the maximum 
 * number of transaction according to the README 
 * file description to Excercise #1.
 * 
 * The function is expected to return a STRING_ARRAY
 * The function accepts following aparameters:
 * 1. STRING_ARRAY logs
 * 2. INTEGER threshold
 */
function processLogs(logs, threshold) {
  let result = [];
  let totalCounter = new Map();

  //Constraints
  if (logs.length > Math.pow(10, 5) ||
      logs.length === 0 ||
      threshold > logs.length ||
      threshold === 0)
        return result = [0];

  const regex = RegExp('^[1-9][0-9]*$');

  logs.forEach( log => {
    let logTokens = log.split(' ');

    //Constraints
    if(!regex.test(logTokens[0]) ||
       !regex.test(logTokens[1]) ||
       !regex.test(logTokens[2]) ||
       logTokens[0].length === 0 ||
       logTokens[0].length > 9 ||
       logTokens[1].length === 0 ||
       logTokens[1].length > 9 ||
       logTokens[2].length === 0 ||
       logTokens[2].length > 9 )
          return result = [0];

    if(!totalCounter.has(logTokens[0]))
      totalCounter.set(logTokens[0], 0);

    if(!totalCounter.has(logTokens[1]))
      totalCounter.set(logTokens[1], 0);

    if(logTokens[0] === logTokens[1]) {
      totalCounter.set(logTokens[0], totalCounter.get(logTokens[0])++);

    } else {

      totalCounter.set(logTokens[0], totalCounter.get(logTokens[0])++);
      totalCounter.set(logTokens[1], totalCounter.get(logTokens[1])++);

    }

  });

  for (let [key, value] of totalCounter) {
    if (value >= threshold)
      result.push(key);
  }

  result.sort((a, b) => a - b);

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const logsCount = parseInt(readLine(), trim(), 10);

  let logs = [];

  for (let i= 0; i < logsCount; i++) {
    const logsItem = readLine();
    logs.push(logsItem);
  }

  const threshold = parseInt(readLine().trim(), 10);

  const result = processLogs(logs, threshold);

  ws.write(result.join('\n') + '\n');

  ws.end();
}