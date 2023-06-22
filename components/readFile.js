import fs from 'fs';
import path from 'path';
import { getUserCurrentDir } from './vars.js';
import { handleError } from './errorHandler.js';
const { stdout } = process;

export function readFile(fileName) {
  let pathToFile = path.join(getUserCurrentDir(), fileName);

  const fileContent = fs.createReadStream(pathToFile);
  fileContent.on('error', (err) => {
    handleError();
  });
  fileContent.on('data', (data) => {
    stdout.write(data.toString() + '\n');
  });
}
