import { setUserCurrentDir, getUserCurrentDir, userHomeDir } from './vars.js';
import { handleError } from './errorHandler.js';
import { currentDirNotification } from './notification.js';
import { handleArgv, handlePath } from './helpers.js';

export const goToDir = (dir) => {
  const directory = handleArgv(dir);
  const dirPath = handlePath(directory);

  try {
    process.chdir(dirPath);
    setUserCurrentDir(dirPath);
    currentDirNotification();
  } catch (err) {
    handleError();
  }
};
