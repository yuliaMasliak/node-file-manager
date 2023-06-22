import fs from 'fs';
import { handleError } from './errorHandler.js';

export function createFile(name) {
  fs.writeFile(name, '', (err) => {
    if (err) {
      handleError();
    }
    console.log('File created successfully!');
  });
}
