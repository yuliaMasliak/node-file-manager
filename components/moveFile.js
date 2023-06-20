import fs from 'fs';
import path from 'path';
import { userHomeDir } from './vars.js';

export async function moveFile(fileName, newDirectory) {
  const destinationFilePath = path.resolve(userHomeDir, newDirectory, fileName);
  const destinationStream = fs.createWriteStream(destinationFilePath);
  const currentStream = fs.createReadStream(fileName);
  currentStream.on('data', (chunk) => {
    destinationStream.write(chunk);
  });
  currentStream.on('end', (err) => {
    if (err) return;
    console.log('File moved successfully!');
    fs.unlink(fileName, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Initial file deleted successfully');
      }
    });
  });
}
