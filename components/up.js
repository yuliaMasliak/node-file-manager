import { getUserCurrentDir, setUserCurrentDir, userHomeDir } from './vars.js';

export const goUP = () => {
  if (getUserCurrentDir() === userHomeDir) {
    return;
  } else {
    setUserCurrentDir(
      getUserCurrentDir().slice(0, getUserCurrentDir().lastIndexOf('\\'))
    );
    process.chdir(getUserCurrentDir());
  }
};
