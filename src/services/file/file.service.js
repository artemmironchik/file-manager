import { createReadStream, createWriteStream, rm } from 'node:fs'
import { writeFile, rename } from 'node:fs/promises'
import { join } from 'node:path'

import { 
  printInvalidInputError, 
  printOperationFailedError 
} from "../../utils/index.js"

const readFile = async (...args) => {
  if (args.length !== 1) {
    printInvalidInputError()

    return
  }

  const pathToFile = args[0]

  const stream = createReadStream(pathToFile)

  stream
    .on('error', () => printOperationFailedError)
    .pipe(process.stdout)
}

const createFile = async (appState, ...args) => {
  if (args.length !== 1) {
    printInvalidInputError()

    return
  }

  const filename = args[0]
  const pathToFile = join(appState.currentDirectory, filename)

  try {
    await writeFile(pathToFile, '', { flag: 'wx+' })
  } catch {
    printOperationFailedError()
  }
}

const renameFile = async (...args) => {
  if (args.length !== 2) {
    printInvalidInputError()

    return
  }

  const [pathToOldFile, newFilename] = args

  try {
    await rename(pathToOldFile, newFilename)
  } catch {
    printOperationFailedError()
  }
}

const copyFile = async (...args) => {
  if (args.length !== 2) {
    printInvalidInputError()

    return
  }

  const [pathToCopiedFile, pathToFile] = args

  const readStream  = createReadStream(pathToCopiedFile)
  const writeStream = createWriteStream(pathToFile)

  readStream
    .on('error', printOperationFailedError)
    .pipe(writeStream)
}

const deleteFile = async (...args) => {
  if (args.length !== 1) {
    printInvalidInputError()

    return
  }

  const pathToFile = args[0]

  rm(pathToFile, (error) => {
    if (error) {
      printOperationFailedError()
    }
  })
}

const moveFile = async (...args) => {
  if (args.length !== 2) {
    printInvalidInputError()

    return
  }

  const [pathToCopiedFile, _] = args

  try {
    await copyFile(...args)

    await deleteFile(pathToCopiedFile)
  } catch {
    printOperationFailedError()
  }
}

export const fileService = {
  readFile,
  createFile,
  renameFile,
  copyFile,
  deleteFile,
  moveFile,
}