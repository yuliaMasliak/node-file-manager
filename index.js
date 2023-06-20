const { stdin, stdout } = process;
import { showList } from './components/ls.js';
import { goUP } from './components/up.js';
import { goToDir } from './components/changeDir.js';
import { userHomeDir } from './components/vars.js';
import { currentDirNotification } from './components/notification.js';
import { readFile } from './components/readFile.js';
import { createFile } from './components/addFie.js';
import { renameFile } from './components/renameFile.js';
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

async function processData() {
  stdin.on('data', async (chunk) => {
    let command = chunk.toString().trim().toLowerCase();
    if (command === 'up') {
      try {
        goUP();
        currentDirNotification();
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        processData();
      }
    } else if (command.split(' ')[0] === 'cd') {
      try {
        goToDir(command.split(' ')[1]);
        currentDirNotification();
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        processData();
      }
    } else if (command.split(' ')[0] === 'ls') {
      const list = await showList();
      try {
        console.table(list);
      } catch {
        (error) => {
          console.error(`Operation failed
      \nEnter right command/path:\n`);
          processData();
        };
      }
    } else if (command.split(' ')[0] === 'cat') {
      try {
        readFile(command.split(' ')[1]);
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        processData();
      }
    } else if (command.split(' ')[0] === 'add') {
      try {
        createFile(command.split(' ')[1]);
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        processData();
      }
    } else if (command.split(' ')[0] === 'rn') {
      try {
        renameFile(command.split(' ')[1], command.split(' ')[2]);
      } catch (error) {
        console.error(`Operation failed
      \nEnter right command/path:\n`);
        processData();
      }
    }
  });
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
