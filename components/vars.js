import { homedir } from 'os';

let userHomeDir = homedir();
let userCurrentDir = userHomeDir;
let userName = '';

function setUserCurrentDir(value) {
  userCurrentDir = value;
}

function getUserCurrentDir() {
  return userCurrentDir;
}

function setUserName(value) {
  userName = value;
}

function getUserName(value) {
  return userName;
}

export {
  setUserCurrentDir,
  getUserCurrentDir,
  userHomeDir,
  setUserName,
  getUserName
};
