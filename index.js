const { stdin, stdout } = process;
import { log } from 'console';
import { homedir } from 'os';

const userHomeDir = homedir();
let userCurrentDir = userHomeDir;

const userName = process.argv[2].replace('--username=', '');
stdout.write(`\nWelcome to the File Manager, ${userName}!\n`);
currentDirNotification();
stdout.write(
  `\nTo move to another directory, please, use commands:\n-up\n-cd path_to_directory\n-ls\n`
);

stdin.on('data', (chunk) => {
  if (chunk.toString().trim().toLowerCase() === 'up') {
    goUP();
  } else if (chunk.toString().trim().toLowerCase().split(' ')[0] === 'cd') {
    goToDir(chunk.toString().trim().toLowerCase().split(' ')[1]);
  }
});

const goToDir = (dir) => {
  userCurrentDir = userCurrentDir + '\\' + dir + '\\';
  currentDirNotification();
};

const goUP = () => {
  if (userCurrentDir === userHomeDir) {
    currentDirNotification();
    return;
  } else {
    userCurrentDir = userCurrentDir.slice(0, userCurrentDir.lastIndexOf('//'));
    currentDirNotification();
  }
};
function currentDirNotification() {
  stdout.write(`\nYou are currently in ${userCurrentDir}\n`);
}
//exit
process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', (code) => {
  if (code === 0) {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);
  } else {
    stderr.write(`Smth went wrong, the error code is ${code}\n`);
  }
});
