const { stderr, stdout, stdin } = process;
import { processData } from './processData.js';
import { userHomeDir, setUserName, getUserName } from './vars.js';

export function exit() {
  process.on('SIGINT', () => {
    process.exit(0);
  });
  stdin.on('data', (data) => {
    if (data.toString().slice(0, 5) === '.exit') {
      process.exit(0);
    }
  });

  process.on('exit', (code) => {
    if (code === 0) {
      stdout.write(
        `\nThank you for using File Manager, ${getUserName()}, goodbye!\n`
      );
    } else {
      stderr.write(`Smth went wrong, the error code is ${code}\n`);
    }
  });
}
