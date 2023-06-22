import { setUserCurrentDir, getUserCurrentDir, userHomeDir } from './vars.js';
import { handleError } from './errorHandler.js';
import { currentDirNotification } from './notification.js';

export const goToDir = (dir) => {
  const newDir = userHomeDir + '\\' + dir;
  try {
    process.chdir(newDir);
    setUserCurrentDir(newDir);
    currentDirNotification();
  } catch (err) {
    handleError();
  }
};
