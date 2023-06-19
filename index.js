const { stdin, stdout } = process;
import { showList } from './components/ls.js';
import { goUP } from './components/up.js';
import { goToDir } from './components/changeDir.js';
import { userHomeDir } from './components/vars.js';

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
      try {
        goUP();
        currentDirNotification();
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        console.log(error);
        processData();
      }
    } else if (chunk.toString().trim().toLowerCase().split(' ')[0] === 'cd') {
      try {
        goToDir(chunk.toString().trim().toLowerCase().split(' ')[1]);
        currentDirNotification();
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        console.log(error);
        processData();
      }
    }
  });
}

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
