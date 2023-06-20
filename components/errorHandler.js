import { processData } from './processData.js';

function handleError() {
  console.error(`Operation failed
  \nEnter right command/path:\n`);
  processData();
}
