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

function markAsDone (list, index) {
    list[index].done = true
    db.write(list)
}

function markAsUndone (list, index) {
    list[index].done = false
    db.write(list)
}

function updateTitle (list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '新的标题为？',
        default: list[index].title
    }).then(answer => {
        list[index].title = answer.title
        db.write(list)
    });
}

function remove (list, index) {
    list.splice(index, 1)
    db.write(list)
}

function askForCreatTask (list) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '请输入任务标题',
    }).then(answer => {
        list.push({
            title: answer.title,
            done: false
        })
        db.write(list)
    });
}

function askForAction (list, index) {
    const actions = { markAsDone, markAsUndone, remove, updateTitle }
    inquirer.prompt({
        type: 'list', name: 'action',
        message: '请选择操作',
        choices: [
            { name: '退出', value: 'quit' },
            { name: '已完成', value: 'markAsDone' },
            { name: '未完成', value: 'markAsUndone' },
            { name: '改标题', value: 'updateTitle' },
            { name: '删除', value: 'remove' }
        ]
    }).then(answers2 => {
        const action = actions[answers2.action]
        action && action(list, index)
    })
}

function printTasks (list) {
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
                }), { name: '+ 创建任务', value: '-2' }]
            }
        ])
        .then(answers => {
            const index = parseInt(answers.index)
            if (index >= 0) {
                // 询问任务
                askForAction(list, index)
            } else if (index === -2) {
                // 创建任务
                askForCreatTask(list)
            }
        });
}

module.exports.showAll = async () => {
    // 获取之前的任务
    const list = await db.read()
    // 打印之前的任务
    printTasks(list)
}