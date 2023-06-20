import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export function compressFile(fileName, destinationFolder) {
  let parentFolder = process.cwd().slice(0, process.cwd().lastIndexOf('\\'));
  const compressedFileName = fileName + '.br';
  const readStream = fs.createReadStream(fileName);
  const writeStream = fs.createWriteStream(
    path.resolve(parentFolder, destinationFolder, compressedFileName)
  );
  const compressedStream = zlib.createBrotliCompress();
  readStream
    .pipe(compressedStream)
    .pipe(writeStream)
    .on('finish', () => {
      console.log('Filed successfully compressed');
    })
    .on('error', (err) => {
      console.error(err.message);
    });
}
