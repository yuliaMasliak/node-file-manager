import fs from 'fs';
import path from 'path';
import { getUserCurrentDir } from './vars.js';

export function readFile(fileName) {
  let pathToFile = path.join(getUserCurrentDir(), fileName);
  console.log(pathToFile);
  const fileContent = fs.createReadStream(pathToFile);
  fileContent.on('data', (data) => {
    console.log(data.toString());
  });
}
