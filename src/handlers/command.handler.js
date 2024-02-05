import { directoryService } from "../services/directory/directory.service.js";
import { fileService } from "../services/file/file.service.js";
import { osService } from "../services/os/os.service.js";
import { printCurrentDirectory, printOperationFailedError } from "../utils/index.js";

const handler = async (command, appState) => {
  const [commandName, ...args] = command.split(' ')

  switch (commandName) {
    case 'up':
      directoryService.goToUpperDirectory(appState, ...args)

      break
    case 'cd':
      directoryService.goToDirectory(appState, ...args)

      break
    case 'ls':
      await directoryService.printList(appState, ...args)

      break
    case 'cat':
      await fileService.readFile(...args)

      break
    case 'add':
      await fileService.createFile(appState, ...args)

      break
    case 'rn':
      await fileService.renameFile(...args)

      break
    case 'cp':
      await fileService.copyFile(...args)

      break
    case 'mv':
      await fileService.moveFile(...args)

      break
    case 'rm':
      await fileService.deleteFile(...args)

      break
    case 'os':
      osService.getOSInfo(...args)

      break
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

  printCurrentDirectory(appState.currentDirectory)
}

export default handler
