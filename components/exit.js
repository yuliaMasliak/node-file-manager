const { stderr, stdout } = process;
import { userHomeDir, setUserName, getUserName } from './vars.js';

export function exit() {
  process.on('SIGINT', () => {
    process.exit();
  });

  process.on('exit', (code) => {
    if (code === 0) {
      stdout.write(
        `Thank you for using File Manager, ${getUserName()}, goodbye!\n`
      );
    } else {
      stderr.write(`Smth went wrong, the error code is ${code}\n`);
    }
  });
}
