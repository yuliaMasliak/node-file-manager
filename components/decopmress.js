import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { handleError } from './errorHandler.js';

export function decompressFile(fileName, destinationFolder) {
  let parentFolder = process.cwd().slice(0, process.cwd().lastIndexOf('\\'));
  const compressedFileName = fileName.slice(0, fileName.lastIndexOf('.'));
  let readStream = '';
  let writeStream = '';

  readStream = fs.createReadStream(fileName);
  writeStream = fs.createWriteStream(
    path.resolve(parentFolder, destinationFolder, compressedFileName)
  );

  const decompressedStream = zlib.createBrotliDecompress();

  decompressedStream.on('data', (data) => {
    writeStream.write(data);
  });

  decompressedStream.on('end', () => {
    writeStream.end();
    console.log('File decompressed successfully');
  });

  decompressedStream.on('error', (error) => {
    handleError();
  });

  writeStream.on('error', (error) => {
    handleError();
  });

  readStream.on('error', (error) => {
    handleError();
  });

  readStream.pipe(decompressedStream);
}
