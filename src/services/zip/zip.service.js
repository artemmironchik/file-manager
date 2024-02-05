import { createReadStream, createWriteStream } from 'node:fs'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'

import { printInvalidInputError, printOperationFailedError } from "../../utils/index.js"

const compress = async (...args) => {
  if (args.length !== 2) {
    printInvalidInputError()

    return
  }

  const [pathToFile, pathToNewFile] = args

  const readStream = createReadStream(pathToFile)
  const writeStream = createWriteStream(pathToNewFile)

  const brotli = createBrotliCompress()

  readStream
    .on('error', printOperationFailedError)
    .pipe(brotli)
    .on('error', printOperationFailedError)
    .pipe(writeStream)
}

const decompress = async (...args) => {
  if (args.length !== 2) {
    printInvalidInputError()

    return
  }

  const [pathToFile, pathToNewFile] = args

  const readStream = createReadStream(pathToFile)
  const writeStream = createWriteStream(pathToNewFile)

  const brotli = createBrotliDecompress()

  readStream
    .on('error', printOperationFailedError)
    .pipe(brotli)
    .on('error', printOperationFailedError)
    .pipe(writeStream)
}

export const zipService = {
  compress,
  decompress,
}