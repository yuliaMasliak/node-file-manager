import crypto from 'crypto';
import { readFile } from 'fs';
import { handleError } from './errorHandler.js';

export async function calculateHash(path) {
  readFile(path, (err, file) => {
    if (err) {
      handleError();
    } else {
      console.log(crypto.createHash('sha256').update(file).digest('hex'));
    }
  });
}
