#!/usr/bin/env node

const yargs = require('yargs')
const app = require('./index')

const commands = ['create', 'get', 'update', 'delete']

const builder = (command) => {
  command
    .positional('command', {
      describe: 'CRUD operation to perform',
      choices: commands,
    })
    .positional('name', {
      describe: 'AWS Secrets Manager secret name',
    })
    .positional('description', {
      describe: 'AWS Secrets Manager secret description',
      default: '',
    })
}

const handler = async ({ command, name, description }) => {
  switch (command) {
    case 'create':
      await app.exportEnvIntoSm(name, description)
      break
    case 'get':
      await app.getEnvFromSm(name)
      break
    case 'update':
      await app.updateEnvInsideSm(name)
      break
    case 'delete':
      await app.deleteEnvFromSm(name)
      break
    default:
      throw new Error(`${command} is not a valid command`)
  }
}

yargs
  .command('* <command> <name> [description]', false, builder, handler)
  .parse()
