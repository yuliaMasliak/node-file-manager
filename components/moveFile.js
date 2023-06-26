import fs from 'fs';
import path from 'path';

import { handleError } from './errorHandler.js';
import { handleArgv, handlePath } from './helpers.js';

export async function moveFile(pathToFile = '', pathToNewDirectory = '') {
  if (pathToFile.length < 1 || pathToNewDirectory.length < 1) {
    handleError();
  }

  const baseFileName = handleArgv(pathToFile);
  const baseFilePath = handlePath(baseFileName);

  const destinationFileName = handleArgv(pathToNewDirectory);
  const destinationFilePath = handlePath(destinationFileName);

  const newPath = path.join(
    destinationFilePath,
    baseFilePath.slice(baseFilePath.lastIndexOf('\\'))
  );

  const writeStream = fs.createWriteStream(newPath);
  const readStream = fs.createReadStream(baseFilePath);
  readStream.on('error', (err) => {
    handleError();
  });
  writeStream.on('error', (err) => {
    handleError();
  });

  readStream.pipe(writeStream);
  writeStream.on('finish', () => {
    console.log(`File moved successfully!`);
    fs.unlink(baseFilePath, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });
}
