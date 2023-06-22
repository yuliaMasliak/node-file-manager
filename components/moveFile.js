import fs from 'fs';
import path from 'path';
import { userHomeDir } from './vars.js';
import { handleError } from './errorHandler.js';

export async function moveFile(fileName, newDirectory) {
  const destinationFilePath = path.resolve(userHomeDir, newDirectory, fileName);
  const writeStream = fs.createWriteStream(destinationFilePath);
  const readStream = fs.createReadStream(fileName);
  readStream.on('error', (err) => {
    handleError();
  });
  writeStream.on('error', (err) => {
    handleError();
  });

  readStream.pipe(writeStream);
  writeStream.on('finish', () => {
    console.log(`File moved successfully!`);
    fs.unlink(fileName, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });
}
