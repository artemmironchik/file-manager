import { homedir } from 'os'

import { printInvalidInputError } from './error.js'

const getStartingState = () => {
  const args = process.argv.slice(2)

  const [key, username] = args[0].split('=')

  if (key.substring(2) !== 'username') {
    printInvalidInputError()
  }

  return {
    currentDirectory: homedir(),
    username,
  }
}

export {
  getStartingState,
}