import { printOperationFailedError } from "../utils/index.js";

const handler = async (command) => {
  const [commandName, ...args] = command.split(' ')

  switch (commandName) {
    case 'up':
      break;
    case 'cd':
      break;
    case 'ls':
      break;
    case 'cat':
      break;
    case 'add':
      break;
    case 'rn':
      break;
    case 'cp':
      break;
    case 'mv':
      break;
    case 'rm':
      break;
    case 'os':
      break;
    case 'hash':
      break;
    case 'compress':
      break;
    case 'decompress':
      break;
    default:
      printOperationFailedError()

      break;
  }
}

export default handler
