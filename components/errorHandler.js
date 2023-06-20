import { processData } from './processData.js';

export function handleError() {
  console.error(`Operation failed
  \nEnter right command/path:\n`);
  processData();
}
