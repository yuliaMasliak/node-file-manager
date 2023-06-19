import { setUserCurrentDir, getUserCurrentDir, userHomeDir } from './vars.js';

export const goToDir = (dir) => {
  setUserCurrentDir(userHomeDir + '\\' + dir);
  process.chdir(getUserCurrentDir());
};
