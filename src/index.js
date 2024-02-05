import { createInterface } from 'readline/promises'

import { 
  printGreetingMessage, 
  getStartingState, 
  printCurrentDirectory 
} from "./utils/index.js"
import commandHandler from './handlers/command.handler.js'

const main = () => {
  const appState = getStartingState()
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  printGreetingMessage(appState.username)
  printCurrentDirectory(appState.currentDirectory)

  rl.on('line', async (command) => {
    if (command === '.exit') {
      rl.close()

      return
    }

    await commandHandler(command, appState)

    printCurrentDirectory(appState.currentDirectory)
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${appState.username}, goodbye!`)
  })
}

main()