import fs from 'fs';
import path from 'path';
import { handleError } from './errorHandler.js';
import { handlePath, handleArgv } from './helpers.js';

export function copyFile(pathToFile = '', newDirectory = '') {
  if (pathToFile.length < 1 || newDirectory.length < 1) {
    handleError();
  }
  const processedBaseFileName = handleArgv(pathToFile);
  const processedBaseFilePath = handlePath(processedBaseFileName);

  const processedNewDirectoryName = handleArgv(newDirectory);
  const processedNewDirectoryPath = handlePath(processedNewDirectoryName);

  let writeStream;

  const readStream = fs.createReadStream(processedBaseFilePath);
  readStream.on('error', () => {
    handleError();
  });

  fs.readFile(processedNewDirectoryPath, (err, data) => {
    if (!err && data) {
      const index = processedBaseFilePath.split('').lastIndexOf('.');
      const copyFileName = processedBaseFilePath.split('');
      copyFileName.splice(index, 0, '-copy');
      writeStream = fs.createWriteStream(copyFileName.join(''));

      writeStream.on('error', () => {
        handleError();
      });
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        console.log(`File copied successfully.`);
      });
    } else {
      const newPath = path.join(
        processedNewDirectoryPath,
        processedBaseFilePath.slice(processedBaseFilePath.lastIndexOf('\\'))
      );

      writeStream = fs.createWriteStream(newPath);
      writeStream.on('error', () => {
        handleError();
      });
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        console.log(`File copied successfully.`);
      });
    }
  });
}
