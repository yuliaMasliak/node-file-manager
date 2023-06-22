import fs from 'fs';
import path from 'path';
import { userHomeDir } from './vars.js';
import { handleError } from './errorHandler.js';
import { stdin } from 'process';

export function copyFile(fileName, newDirectory) {
  const destinationFilePath = path.resolve(userHomeDir, newDirectory, fileName);

  const writeStream = fs.createWriteStream(destinationFilePath);
  const readStream = fs.createReadStream(fileName);

  writeStream.on('error', () => {
    handleError();
  });
  readStream.on('error', () => {
    handleError();
  });
  readStream.pipe(writeStream);
  writeStream.on('finish', () => {
    console.log(`File copied successfully.`);
  });
}
