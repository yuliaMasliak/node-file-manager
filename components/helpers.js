import { userHomeDir, getUserCurrentDir } from './vars.js';

export function handleArgv(string) {
  if (string.startsWith("'") || string.startsWith('"')) {
    return string
      .slice(1, string.length - 1)
      .split(' ')
      .join('\\');
  } else {
    return string;
  }
}

export function handlePath(path) {
  if (path.toLowerCase().includes(userHomeDir.toLowerCase())) {
    return path;
  } else {
    return getUserCurrentDir() + '\\' + path;
  }
}
