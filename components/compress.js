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
  compressedStream.on('data', (data) => {
    writeStream.write(data);
  });

  compressedStream.on('end', () => {
    writeStream.end();
    console.log('File compressed successfully');
  });

  compressedStream.on('error', (error) => {
    console.log('Error during compression:', error);
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

  readStream.pipe(compressedStream);
}
