import crypto from 'crypto';
import { readFile } from 'fs';

export async function calculateHash(path) {
  readFile(path, (err, file) => {
    console.log(crypto.createHash('sha256').update(file).digest('hex'));
  });
}
