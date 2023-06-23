import { setUserCurrentDir, getUserCurrentDir, userHomeDir } from './vars.js';
import { handleError } from './errorHandler.js';
import { currentDirNotification } from './notification.js';

export const goToDir = (dir) => {
  let dirPath = '';

  if (dir.toLowerCase().includes(userHomeDir.toLowerCase())) {
    dirPath = dir;
  } else {
    dirPath = userHomeDir + '\\' + dir;
  }

  try {
    process.chdir(dirPath);
    setUserCurrentDir(dirPath);
    currentDirNotification();
  } catch (err) {
    handleError();
  }
};
