const { stdin, stdout } = process;
import { showList } from './ls.js';
import { goUP } from './up.js';
import { goToDir } from './changeDir.js';
import { readFile } from './readFile.js';
import { createFile } from './addFie.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFile.js';
import { removeFile } from './removeFile.js';
import { getOsData } from './os.js';
import { calculateHash } from './hash.js';
import { compressFile } from './compress.js';
import { decompressFile } from './decopmress.js';
import { handleError } from './errorHandler.js';

export async function processData() {
  stdin.on('data', async (chunk) => {
    let command = chunk.toString().trim().toLowerCase();
    if (command === 'up') {
      goUP();
    } else if (command.split(' ')[0] === 'cd') {
      goToDir(command.split(' ')[1]);
    } else if (command === 'ls') {
      const list = await showList();
      console.table(list);
    } else if (command.split(' ')[0] === 'cat') {
      readFile(command.split(' ')[1]);
    } else if (command.split(' ')[0] === 'add') {
      createFile(command.split(' ')[1]);
    } else if (command.split(' ')[0] === 'rn') {
      renameFile(command.split(' ')[1], command.split(' ')[2]);
    } else if (command.split(' ')[0] === 'cp') {
      copyFile(command.split(' ')[1], command.split(' ')[2]);
    } else if (command.split(' ')[0] === 'mv') {
      moveFile(command.split(' ')[1], command.split(' ')[2]);
    } else if (command.split(' ')[0] === 'rm') {
      removeFile(command.split(' ')[1]);
    } else if (command.split(' ')[0] === 'os') {
      getOsData(command.split(' ')[1]);
    } else if (command.split(' ')[0] === 'hash') {
      calculateHash(command.split(' ')[1]);
    } else if (command.split(' ')[0] === 'compress') {
      compressFile(command.split(' ')[1], command.split(' ')[2]);
    } else if (command.split(' ')[0] === 'decompress') {
      decompressFile(command.split(' ')[1], command.split(' ')[2]);
    } else {
      handleError();
    }
  });
}
