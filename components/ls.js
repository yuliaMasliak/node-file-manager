import { getUserCurrentDir } from './vars.js';
import { readdir } from 'node:fs/promises';

export async function showList() {
  const list = [];

  const files = await readdir(getUserCurrentDir(), { withFileTypes: true });

  files.forEach((file) => {
    let fileData = {
      name: '',
      type: ''
    };
    fileData.name = file.name.slice(0, 30);
    if (file.isDirectory()) {
      fileData.type = 'directory';
    } else {
      fileData.type = 'file';
    }
    list.push(fileData);
  });
  return list;
}
