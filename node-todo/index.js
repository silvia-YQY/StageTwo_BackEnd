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
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择你想操作的任务',
                choices: [{ name: '退出', value: '-1' }, ...list.map((task, index) => {
                    return {
                        name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString()
                    }
                })]
            }
        ])
        .then(answers => {
            // list[answers.index].done = !list[answers.index].done
            console.log(answers);
        });
}