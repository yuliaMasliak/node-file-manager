import fs from 'fs';
import path from 'path';
import { userHomeDir } from './vars.js';

export function removeFile(fileName) {
  fs.unlink(fileName, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('File deleted successfully');
    }
  });
}
