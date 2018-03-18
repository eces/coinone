require('debugs/init')
const chalk = require('chalk')
const path = require('path')
const debug = require('debug')('coinone-cli')
const inquirer = require('inquirer')
const fs = require('fs')
const program = require('commander').parse(process.argv)
const Promise = require('bluebird')

async function main() {
  try {
    const filepath = path.join(process.cwd(), '.coinonerc')
    const config = JSON.parse(fs.readFileSync(filepath))
    config.access_token = Buffer.from(config.access_token, 'base64').toString()
    config.secret_key = Buffer.from(config.secret_key, 'base64').toString()
    
    const sdk = require('./coinone-sdk')
    const api = new sdk(config)
    
    r1 = await api.orderbook({currency: 'xrp'})
    if (r1.result !== 'success')
      throw new Error('API 응답없음')
    
    if (program.args[0] == 'ask') {
      console.log('내년까지 보유를 권장합니다.')
      return
    }
    if (program.args[0] == 'bid') {
      const budget = program.args[1]

      if (!isFinite(+program.args[1]) || +budget < 100) 
        throw new Error('예산을 입력해주세요. 100원 이상')
      let bid = []
      let scale = program.args[2]
      if (scale) {
        r1.bid.forEach( e => {
          if (e.price % scale === 0)
            bid.push(e)
        })
        if (bid.length < 10) {
          for (let i=1; i<(10-bid.length); i++) {
            const price = bid[0].price - scale*i
            if (price < 1) break

            bid.push({
              price: price,
            })
          }
        }
      } else {
        bid = r1.bid.slice(0, 10)
      }

      if (global.default_xrp_requested) {
        requested = {
          bids: [300, 200]
        }
      } else {
        requested = await inquirer.prompt([
          {
            type: 'checkbox',
            message: '분할 매수할 가격을 선택해주세요.',
            name: 'bids',
            pageSize: 10,
            choices: () => {
              return bid.map( e => {
                return {
                  name: e.price
                }
              })
            }
          }
        ])
      }

      const per_budget = budget / requested.bids.length
      const orders = []
      requested.bids.forEach( e => {
        const qty = Math.max(1, per_budget / e)
        console.log('가격: ', e, ' 수량: ', qty)
        orders.push({
          price: e,
          qty: qty,
        })
      })

      confirm = await inquirer.prompt([
        {
          type: 'confirm',
          message: '주문하시겠습니까?',
          name: 'confirmed',
        }
      ])
      if (!confirm.confirmed) return false

      for(let i in orders) {
        const order = orders[i]
        r1 = await api.limit_buy({
          currency: 'xrp',
          price: order.price,
          qty: order.qty,
        })
        if (r1.result === 'success') {
          console.log(
            chalk.white.bgGreen(` ${i}/${orders.length} `), 
            chalk.green(r1.orderId)
          )
        } else {
          console.log(
            chalk.white.bgRed(` ${i}/${orders.length} `),
            chalk.red(api.get_message_from_code(r1.errorCode))
          )
        }
        // TODO: make sure API quota limit
        await Promise.delay(1000)
      }
      return
    }
    
    const Table = require('cli-table2')
    const table = new Table({
      head: [chalk.white.bold('price'), chalk.white.bold('qty')],
      colWidths: [10, 20],
    })

    r1.ask = r1.ask.sort( (a, b) => {
      return a.price - b.price
    })
    r1.bid = r1.bid.sort( (a, b) => {
      return b.price - a.price
    })

    const lines = (program.args[0] && program.args[0]-1) || 10
    debug(program)
    for (let i=0; i<r1.bid.length; i++) {
      if (i > lines) break
      table.push([chalk.red(r1.bid[i].price), r1.bid[i].qty])
    }
    for (let i=0; i<r1.ask.length; i++) {
      if (i > lines) break
      table.unshift([chalk.blue(r1.ask[i].price), r1.ask[i].qty])
    }
    console.log(table.toString())
  } catch (error) {
    console.log(chalk.white.bgRed(' 주문실패 '), chalk.red(error.message))
    process.exit(-1)
  }
}
main()
