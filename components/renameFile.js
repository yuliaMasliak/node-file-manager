import fs from 'fs';
import { handleError } from './errorHandler.js';

export function renameFile(oldName, newName) {
  fs.rename(oldName, newName, (err) => {
    if (err) {
      handleError();
    } else {
      console.log('File renamed successfully!');
    }
  });
}
