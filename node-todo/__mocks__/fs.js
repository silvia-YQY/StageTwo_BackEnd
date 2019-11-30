const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)
const readMocks = {}

fs.setReadFileMock = (path, err, data) => {
    readMocks[path] = [err, data]
}

// fs.readFile('xxx', fn)
fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }

    if (path in readMocks) {
        callback(...readMocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

const writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
    if (callback === undefined) { callback = options }
    if (path in writeMocks) {
        callback(...writeMocks[path](path, data, options, callback))
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}

module.exports = fs