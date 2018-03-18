const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
updateNotifier({ pkg }).notify();

const program = require('commander');

program
  .version(pkg.version);

program
  .command('login', '로그인합니다.')

program
  .command('whoami', '로그인된 계정을 확인합니다.')

program
  .command('xrp', 'XRP 리플코인 호가를 조회합니다.')
  .option('-n --lines', '표시갯수')
  .option('-s --scale', '호가단위')

program
  .command('btc', 'btc')
program
  .command('bch', 'bch')
program
  .command('eth', 'eth')
program
  .command('etc', 'etc')
program
  .command('qtum', 'qtum')
program
  .command('iota', 'iota')
program
  .command('ltc', 'ltc')
program
  .command('btg', 'btg')

program.parse(process.argv);