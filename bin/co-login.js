require('debugs/init')
const chalk = require('chalk')
const path = require('path')
const debug = require('debug')('coinone-cli')
const inquirer = require('inquirer')
const fs = require('fs')
const program = require('commander').parse(process.argv)

async function main() {
  try {
    const input = await inquirer.prompt([
      {
        type: 'input',
        message: 'Access Token:',
        name: 'access_token',
      },
      {
        type: 'password',
        message: 'Secret Key:',
        name: 'secret_key',
      },
    ])
    
    if (!input.access_token)
      throw new Error('Access Token을 입력해주세요.')
    if (!input.secret_key)
      throw new Error('Secret Key를 입력해주세요.')
    
    const filepath = path.join(process.cwd(), '.coinonerc')
    let config = {}
    
    config.access_token = input.access_token
    config.secret_key = input.secret_key

    // validate
    const sdk = require('./coinone-sdk')
    const api = new sdk(config)
    r1 = await api.my_complete_orders({currency: 'xrp'})
    if (r1.result !== 'success')
      throw new Error('API 인증키가 올바르지 않습니다.')
    
    config.access_token = new Buffer(input.access_token).toString('base64')
    config.secret_key = new Buffer(input.secret_key).toString('base64')
    
    await fs.writeFileSync(filepath, JSON.stringify(config, null, '  '))
    console.log(chalk.white.bgGreen(' 로그인성공 '), chalk.green('로컬에 저장되었습니다.'))
  } catch (error) {
    console.log(chalk.white.bgRed(' 로그인실패 '), chalk.red(error.message))
    process.exit(-1)
  }
}
main()
