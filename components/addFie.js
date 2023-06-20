import fs from 'fs';

export function createFile(name) {
  fs.writeFile(name, '', (err) => {
    if (err) {
      return err;
    }
    console.log('File created successfully!');
  });
}
