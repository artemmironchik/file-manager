import { readFile } from 'fs/promises'
import { createHash } from 'node:crypto'

import { printInvalidInputError, printOperationFailedError } from "../../utils/index.js"

const getHash = async (...args) => {
  if (args.length !== 1) {
    printInvalidInputError()

    return
  }

  const pathToFile = args[0]

  try {
    const data = await readFile(pathToFile)
  
    const hash = createHash('sha256').update(data).digest('hex')
  
    console.log(hash)
  } catch {
    printOperationFailedError()
  }
}

export const hashService = {
  getHash,
}