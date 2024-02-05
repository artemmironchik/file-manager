const printGreetingMessage = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`)
}

const printCurrentDirectory = (curDir) => {
  console.log(`You are currently in ${curDir}`)
}

export {
  printGreetingMessage,
  printCurrentDirectory,
}