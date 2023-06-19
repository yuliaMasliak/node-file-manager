const { stdout } = process;

export function currentDirNotification() {
  stdout.write(`\nYou are currently in ${process.cwd()} directory\n`);
}
