"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander = __importStar(require("commander"));
var main_1 = require("./main");
var program = new commander.Command();
program
    .version('0.0.1') // 版本
    .name('translate') // 名称
    .usage('English') // 参数
    .arguments('<cmd> [env]')
    .action(function (english) {
    main_1.translate(english);
});
program.parse(process.argv);
