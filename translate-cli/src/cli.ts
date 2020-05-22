import * as commander from 'commander';
import { translate } from './main';

const program = new commander.Command();
program
  .version('0.0.1') // 版本
  .name('translate') // 名称
  .usage('English') // 参数
  .arguments('<cmd> [env]')
  .action(function(english) {
    translate(english);
  });

program.parse(process.argv);
