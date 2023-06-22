const { stdout } = process;
import { processData } from './processData.js';
import { currentDirNotification } from './notification.js';
import { userHomeDir, setUserName, getUserName } from './vars.js';

export function startApp() {
  process.chdir(userHomeDir);
  setUserName(process.argv[2].replace('--username=', ''));

  stdout.write(`\nWelcome to the File Manager, ${getUserName()}!\n`);
  currentDirNotification();
  stdout.write(
    `\nTo move to another directory, please, use commands:\n-up\n-cd path_to_directory\n\n`
  );
  processData();
}
