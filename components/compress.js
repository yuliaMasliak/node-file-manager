import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { handleError } from './errorHandler.js';

export function compressFile(fileName, destinationFolder) {
  let parentFolder = process.cwd().slice(0, process.cwd().lastIndexOf('\\'));
  const compressedFileName = fileName + '.br';
  const readStream = fs.createReadStream(fileName);
  const writeStream = fs.createWriteStream(
    path.resolve(parentFolder, destinationFolder, compressedFileName)
  );
  const compressedStream = zlib.createBrotliCompress();
  compressedStream.on('data', (data) => {
    writeStream.write(data);
  });

  compressedStream.on('end', () => {
    writeStream.end();
    console.log('File compressed successfully');
  });

  compressedStream.on('error', (error) => {
    handleError();
  });

  writeStream.on('error', (error) => {
    handleError();
  });

  readStream.on('error', (error) => {
    handleError();
  });

  readStream.pipe(compressedStream);
}
