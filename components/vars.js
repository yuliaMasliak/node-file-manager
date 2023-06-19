import { homedir } from 'os';

let userHomeDir = homedir();
let userCurrentDir = userHomeDir;

function setUserCurrentDir(value) {
  userCurrentDir = value;
}

function getUserCurrentDir() {
  return userCurrentDir;
}

export { setUserCurrentDir, getUserCurrentDir, userHomeDir };
