import { directoryService } from "../services/directory/directory.service.js";
import { printOperationFailedError } from "../utils/index.js";

const handler = async (command, appState) => {
  const [commandName, ...args] = command.split(' ')

  switch (commandName) {
    case 'up':
      directoryService.goToUpperDirectory(appState, ...args)

      break;
    case 'cd':
      directoryService.goToDirectory(appState, ...args)

      break;
    case 'ls':
      await directoryService.printList(appState, ...args)

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
