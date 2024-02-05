import { parse, resolve } from 'node:path'
import { readdir } from 'node:fs/promises';

import { printInvalidInputError, printOperationFailedError } from "../../utils/index.js"

const goToDirectory = (appState, ...args) => {
  if (args.length !== 1) {
    printInvalidInputError()

    return
  }

  try {
    const newDir = resolve(appState.currentDirectory, args[0])

    process.chdir(newDir)

    appState.currentDirectory = newDir
  } catch {
    printOperationFailedError()
  }
}

const goToUpperDirectory = (appState, ...args) => {
  if (args.length) {
    printInvalidInputError()

    return
  }

  if (appState.currentDirectory === parse(appState.currentDirectory).root) {
    return
  }

  goToDirectory(appState, '..')
}

const printList = async (appState, ...args) => {
  if (args.length) {
    printInvalidInputError()

    return
  }

  try {
    const files = await readdir(appState.currentDirectory, { withFileTypes: true });

    const mappedFiles = files.map((file) => ({ name: file.name, type: file.isFile() ? 'file' : 'directory' }))

    const sortedDirectories = mappedFiles
      .filter((file) => file.type === 'directory')
      .sort((a, b) => a.name.localeCompare(b.name))
    const sortedFiles = mappedFiles
      .filter((file) => file.type === 'file')
      .sort((a, b) => a.name.localeCompare(b.name))

    const filteredFiles = sortedDirectories.concat(sortedFiles)

    console.table(filteredFiles, ['name', 'type']);
  } catch {
    printOperationFailedError()
  }
}

export const directoryService = {
  goToDirectory,
  goToUpperDirectory,
  printList,
}