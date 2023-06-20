import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export function decompressFile(fileName, destinationFolder) {
  let parentFolder = process.cwd().slice(0, process.cwd().lastIndexOf('\\'));
  const compressedFileName = fileName.slice(0, fileName.lastIndexOf('.'));
  let readStream = '';
  let writeStream = '';
  try {
    readStream = fs.createReadStream(fileName);
    writeStream = fs.createWriteStream(
      path.resolve(parentFolder, destinationFolder, compressedFileName)
    );
  } catch (err) {
    console.log('Wrong path to the file\n');
  }

  const decompressedStream = zlib.createBrotliDecompress();
  try {
    readStream
      .pipe(decompressedStream)
      .pipe(writeStream)
      .on('finish', () => {
        console.log('Filed successfully decompressed');
      });
  } catch (error) {
    throw new Error('Error');
  }
}
