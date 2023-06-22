import os from 'os';
import { handleError } from './errorHandler.js';
const { stdout } = process;

export function getOsData(command) {
  switch (command) {
    case '--eol':
      stdout.write(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      stdout.write(`Overall amount of CPUS is ${os.cpus().length}\n`);
      os.cpus().forEach((cpu, i) => {
        stdout.write(
          `${i + 1}) ${cpu.model}, clock rate - ${(cpu.speed / 1000).toFixed(
            2
          )} GHz\n`
        );
      });
      break;
    case '--homedir':
      stdout.write(os.homedir() + '\n');
      break;
    case '--username':
      const userData = JSON.stringify(os.userInfo());
      stdout.write(JSON.parse(userData).username + '\n');
      break;
    case '--architecture':
      stdout.write(os.arch() + '\n');
      break;
    default:
      handleError();
      break;
  }
}
