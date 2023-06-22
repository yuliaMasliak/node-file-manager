import fs from 'fs';
import { handleError } from './errorHandler.js';

export function removeFile(fileName) {
  fs.unlink(fileName, (err) => {
    if (err) {
      handleError();
    } else {
      console.log('File deleted successfully');
    }
  });
}
