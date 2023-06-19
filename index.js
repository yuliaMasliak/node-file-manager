const { stdin, stdout } = process;
import { homedir } from 'os';

const userHomeDir = homedir();
let userCurrentDir = userHomeDir;
init();

function init() {
  process.chdir(userHomeDir);
  const userName = process.argv[2].replace('--username=', '');
  stdout.write(`\nWelcome to the File Manager, ${userName}!\n`);
  currentDirNotification();
  stdout.write(
    `\nTo move to another directory, please, use commands:\n-up\n-cd path_to_directory\n-ls\n`
  );
  processData();
}

function processData() {
  stdin.on('data', (chunk) => {
    if (chunk.toString().trim().toLowerCase() === 'up') {
      goUP();
    } else if (chunk.toString().trim().toLowerCase().split(' ')[0] === 'cd') {
      goToDir(chunk.toString().trim().toLowerCase().split(' ')[1]);
    }
  });
}

const goToDir = (dir) => {
  try {
    userCurrentDir = userHomeDir + '\\' + dir;
    process.chdir(userCurrentDir);
    currentDirNotification();
  } catch (error) {
    console.error(`Operation failed \nEnter right command/path:\n`);
    processData();
  }
};

const goUP = () => {
  if (userCurrentDir === userHomeDir) {
    currentDirNotification();
    return;
  } else {
    userCurrentDir = userCurrentDir.slice(0, userCurrentDir.lastIndexOf('\\'));
    try {
      process.chdir(userCurrentDir);
      currentDirNotification();
    } catch (error) {
      console.error(`Operation failedup
      \nEnter right command/path:\n`);
      processData();
    }
  }
};
function currentDirNotification() {
  stdout.write(`\nYou are currently in ${process.cwd()} directory\n`);
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
