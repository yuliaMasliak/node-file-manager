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

  decompressedStream.on('data', (data) => {
    writeStream.write(data);
  });

  decompressedStream.on('end', () => {
    writeStream.end();
    console.log('File decompressed successfully');
  });

  decompressedStream.on('error', (error) => {
    console.log('Error during decompression:', error);
  });

  writeStream.on('error', (error) => {
    console.log('Error during writing:', error);
  });

  readStream.on('error', (error) => {
    console.log(
      'Error during reading file, check the corerct path was provided:',
      error
    );
  });

  readStream.pipe(decompressedStream);
}
