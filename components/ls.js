import { log } from 'console';
import { getUserCurrentDir } from './vars.js';
import { readdir } from 'node:fs/promises';

export async function showList() {
  const list = [];
  try {
    const files = await readdir(getUserCurrentDir(), { withFileTypes: true });

    files.forEach((file) => {
      let fileData = {
        name: '',
        type: ''
      };
      if (file.isDirectory()) {
        fileData.name = file.name.slice(0, 30);
        fileData.type = 'directory';
      } else {
        fileData.name = file.name.slice(0, 30);
        fileData.type = 'file';
      }
      list.push(fileData);
    });
    console.table(list);
  } catch (err) {
    console.error(err);
  }
}
