import fs from 'fs';
import path from 'path';
import { handleError } from './errorHandler.js';

export function copyFile(fileName, newDirectory) {
  const destinationFilePath = path.resolve(process.cwd(), fileName);

  let writeStream;

  const readStream = fs.createReadStream(fileName);
  readStream.on('error', () => {
    handleError();
  });
  fs.readFile(destinationFilePath, (err, data) => {
    if (!err && data) {
      const index = fileName.split('').lastIndexOf('.');
      const copyFileName = fileName.split('');
      copyFileName.splice(index, 0, '-copy');
      const copy = path.resolve(process.cwd(), copyFileName.join(''));
      writeStream = fs.createWriteStream(copy);

      writeStream.on('error', () => {
        handleError();
      });
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        console.log(`File copied successfully.`);
      });
    } else {
      writeStream = fs.createWriteStream(destinationFilePath);
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
