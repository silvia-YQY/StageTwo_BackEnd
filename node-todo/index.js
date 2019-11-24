const homedir = require('os').homedir()
// 优先使用用户设置的变量HOME目录，若没有设置则使用系统默认的HOME目录
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

module.exports.add = (title) => {
    // 读取之前的任务
    fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        if (error) {
            console.log('error', error)
        }
        else {
            let list;
            try {
                list = JSON.parse(data.toString())
                console.log(list);
            } catch (err) {
                list = []
            }
            console.log(list);
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            console.log(list);
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string + '\n', (err) => {
                if (err) {
                    console.log('写文件出错：', err);
                }

            })
        }

    })
    // 添加一个 title 任务
    // 存储任务到文件
}