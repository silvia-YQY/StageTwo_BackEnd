const program = require('commander');
const api = require('./index.js')

program
    .option('-x, --xxx', 'test option')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.pop().join(' ')
        console.log(words);
        api.add(words)
    });
program
    .command('clear')
    .description('clear all task')
    .action((...args) => {
        console.log('this is clear');
    });


program.parse(process.argv);
console.log(program.xxx);
