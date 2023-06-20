import fs from 'fs';
import path from 'path';
import { userHomeDir } from './vars.js';

export function copyFile(fileName, newDirectory) {
  const destinationFileName = path.resolve(userHomeDir, newDirectory, fileName);
  console.log(destinationFileName);
  fs.copyFile(fileName, destinationFileName, (err) => {
    if (err) {
      return err;
    }
    console.log('File copied successfully!');
  });
}
