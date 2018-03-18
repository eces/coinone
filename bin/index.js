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

program.parse(process.argv);