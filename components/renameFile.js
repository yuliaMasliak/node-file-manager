import fs from 'fs';
import { handleError } from './errorHandler.js';
import { handleArgv, handlePath } from './helpers.js';

export function renameFile(oldName, newName) {
  const processedOldName = handleArgv(oldName);
  const oldPath = handlePath(processedOldName);
  fs.rename(oldPath, newName, (err) => {
    if (err) {
      handleError();
    } else {
      console.log('File renamed successfully!');
    }
  });
}
