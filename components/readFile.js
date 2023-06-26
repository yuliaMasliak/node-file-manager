import fs from 'fs';
import path from 'path';
import { getUserCurrentDir } from './vars.js';
import { handleError } from './errorHandler.js';
const { stdout } = process;
import { handleArgv, handlePath } from './helpers.js';

export function readFile(fileName) {
  let processedFileName = handleArgv(fileName);

  let pathToFile = handlePath(processedFileName);
  console.log(pathToFile);
  const fileContent = fs.createReadStream(pathToFile);
  fileContent.on('error', (err) => {
    handleError();
  });
  fileContent.on('data', (data) => {
    stdout.write(data.toString() + '\n');
  });
}
