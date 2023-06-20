import fs from 'fs';

export function renameFile(oldName, newName) {
  fs.rename(oldName, newName, (err) => {
    if (err) {
      return err;
    }
    console.log('File renamed successfully!');
  });
}
