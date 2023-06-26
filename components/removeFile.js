import fs from 'fs';
import { handleError } from './errorHandler.js';
import { handleArgv, handlePath } from './helpers.js';

export function removeFile(pathToFile) {
  const processedName = handleArgv(pathToFile);
  const proessedPathToFile = handlePath(processedName);
  fs.unlink(proessedPathToFile, (err) => {
    if (err) {
      handleError();
    } else {
      console.log('File deleted successfully');
    }
  });
}
