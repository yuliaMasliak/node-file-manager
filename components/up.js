import { getUserCurrentDir, setUserCurrentDir, userHomeDir } from './vars.js';
import { currentDirNotification } from './notification.js';

export const goUP = () => {
  if (getUserCurrentDir() === userHomeDir) {
    return;
  } else {
    setUserCurrentDir(
      getUserCurrentDir().slice(0, getUserCurrentDir().lastIndexOf('\\'))
    );
    process.chdir(getUserCurrentDir());
    currentDirNotification();
  }
};
