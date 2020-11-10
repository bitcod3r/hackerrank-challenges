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

  if (haveConstraints(logs, threshold))
      return result = [0]; // 0 means error

  logs.forEach( log => {
    let logTokens = log.split(' ');

    if(isNotValidFormat(logTokens))
          return result = [0]; // 0 means error

    initializeCounters(logTokens[0],logTokens[1]);

    addCounters(logTokens[0],logTokens[1]);
  });

  for (let [key, value] of totalCounter) {
    if (value >= threshold)
      result.push(key);
  }

  result.sort((a, b) => a - b);

  return result;
}

// Check length contraints.
function haveConstraints(l, t){
  let lHasConstraints = l.length > Math.pow(10, 5) ||
                        l.length === 0;
  let tHasConstraints = t > logs.length || t === 0;

  return lHasConstraints || tHasConstraints;
}

// Check length and format constraints 
function isNotValidFormat(values) {
  // In range ascii[0-9] and starts with non-zero
  const regex = RegExp('^[1-9][0-9]*$');

  values.forEach( value => {
    if (!regex.test(value) ||
         value.length === 0 ||
         value.length > 9)

        return true;
    }
  );

  return false;
}

// Initialize counter to zero if not exist in HashMap
function initializeCounters(sender, receiver) {
    if(!totalCounter.has(sender))
      totalCounter.set(sender, 0);

    if(!totalCounter.has(receiver))
      totalCounter.set(receiver, 0);
}

function addCounters(sender, receiver) {
  if(sender === receiver) {
    totalCounter.set(sender, totalCounter.get(sender)++);

  } else {

    totalCounter.set(sender, totalCounter.get(sender)++);
    totalCounter.set(receiver, totalCounter.get(receiver)++);
  }
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