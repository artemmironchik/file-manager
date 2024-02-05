import { EOL, arch, cpus, homedir, userInfo } from 'node:os'

import { printInvalidInputError } from "../../utils/index.js"

const getOSInfo = (...args) => {
  if (args.length !== 1) {
    printInvalidInputError()

    return
  }

  switch (args[0]) {
    case '--EOL':
      console.log(JSON.stringify(EOL))

      break
    case '--cpus':
      const allCpus = cpus()

      console.log('Overall cpus amount: ', allCpus.length)

      allCpus.forEach((cpu) => {
        console.log('Model: ', cpu.model.trim())
        console.log('Clock rate: ', cpu.speed / 1000)
      })

      break
    case '--homedir':
      console.log(homedir())

      break
    case '--username':
      console.log(userInfo().username)

      break
    case '--architecture':
      console.log(arch())

      break
    default:
      printInvalidInputError()

      break
  }
}

export const osService = {
  getOSInfo,
}