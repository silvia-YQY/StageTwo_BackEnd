const homedir = require('os').homedir()
// 优先使用用户设置的变量HOME目录，若没有设置则使用系统默认的HOME目录
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

const db = {
    read (path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) return reject(error)
                let list;
                try {
                    list = JSON.parse(data.toString())
                } catch (err) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write (list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (err) => {
                if (err) return reject()
                resolve()
            })
        })
    }
}


// 目前node.js还不支持export
module.exports = db