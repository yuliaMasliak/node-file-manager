const { stdin } = process;
import { showList } from './ls.js';
import { goUP } from './up.js';
import { goToDir } from './changeDir.js';
import { currentDirNotification } from './notification.js';
import { readFile } from './readFile.js';
import { createFile } from './addFie.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFile.js';
import { removeFile } from './removeFile.js';
import { getOsData } from './os.js';
import { calculateHash } from './hash.js';
import { compressFile } from './compress.js';

export async function processData() {
  stdin.on('data', async (chunk) => {
    let command = chunk.toString().trim().toLowerCase();
    if (command === 'up') {
      try {
        goUP();
        currentDirNotification();
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'cd') {
      try {
        goToDir(command.split(' ')[1]);
        currentDirNotification();
      } catch (error) {
        handleError();
      }
    } else if (command === 'ls') {
      const list = await showList();
      try {
        console.table(list);
        currentDirNotification();
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'cat') {
      try {
        readFile(command.split(' ')[1]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'add') {
      try {
        createFile(command.split(' ')[1]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'rn') {
      try {
        renameFile(command.split(' ')[1], command.split(' ')[2]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'cp') {
      try {
        copyFile(command.split(' ')[1], command.split(' ')[2]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'mv') {
      try {
        moveFile(command.split(' ')[1], command.split(' ')[2]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'rm') {
      try {
        removeFile(command.split(' ')[1]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'os') {
      try {
        getOsData(command.split(' ')[1]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'hash') {
      try {
        calculateHash(command.split(' ')[1]);
      } catch (error) {
        handleError();
      }
    } else if (command.split(' ')[0] === 'compress') {
      try {
        compressFile(command.split(' ')[1], command.split(' ')[2]);
      } catch (error) {
        console.log(error);
        handleError();
      }
    }
  });
}

function handleError() {
  console.error(`Operation failed
  \nEnter right command/path:\n`);
  processData();
}
