const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
    // 读取之前的任务
    const list = await db.read()  // 由于read为异步，故需要await等待返回后再继续
    // 添加一个 title 任务
    list.push({ title, done: false })
    // 存储任务到文件
    await db.write(list)
}

module.exports.clear = async (title) => {
    await db.write([])
}

module.exports.showAll = async () => {
    const list = await db.read()
    list.forEach((task, index) => {
        console.log(`${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`);
    });
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'theme',
                message: 'What do you want to do?',
                choices: [
                    'Order a pizza',
                    'Make a reservation',
                    new inquirer.Separator(),
                    'Ask for opening hours',
                    {
                        name: 'Contact support',
                        disabled: 'Unavailable at this time'
                    },
                    'Talk to the receptionist'
                ]
            },
            {
                type: 'list',
                name: 'size',
                message: 'What size do you need?',
                choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
                filter: function (val) {
                    return val.toLowerCase();
                }
            }
        ])
        .then(answers => {
            console.log(JSON.stringify(answers, null, '  '));
        });
}