// require('debugs/init')
const chalk = require('chalk')
const path = require('path')
const debug = require('debug')('coinone-cli')
const inquirer = require('inquirer')
const fs = require('fs')
const program = require('commander').parse(process.argv)

async function main() {
  try {
    const filepath = path.join(process.cwd(), '.coinonerc')
    const config = JSON.parse(fs.readFileSync(filepath))
    config.access_token = Buffer.from(config.access_token, 'base64').toString()
    config.secret_key = Buffer.from(config.secret_key, 'base64').toString()
    
    // validate
    const sdk = require('./coinone-sdk')
    const api = new sdk(config)
    r1 = await api.user_information()
    if (r1.result !== 'success')
      throw new Error('API 인증키가 올바르지 않습니다.')
    
    console.log(chalk.white.bgGreen(' 로그인됨 '), chalk.green(r1.userInfo.emailInfo.email))
  } catch (error) {
    console.log(chalk.white.bgRed(' 로그인실패 '), chalk.red(error.message))
    process.exit(-1)
  }
}
main()
