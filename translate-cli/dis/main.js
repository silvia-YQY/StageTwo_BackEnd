"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = __importStar(require("querystring"));
var md5 = require("md5");
var private_1 = require("./private");
var errorMap = {
    52003: '用户认证失败',
    52004: 'error2',
    unknown: 'error555'
};
exports.translate = function (word) {
    var salt = Math.random();
    var sign = md5(private_1.appid + word + salt + private_1.appSecret);
    var from, to;
    if (/[a-zA-Z]/.test(word[0])) {
        //英 -> 中
        from = 'en';
        to = 'zh';
    }
    else {
        // 中 -> 英
        to = 'en';
        from = 'zh';
    }
    var query = querystring.stringify({
        q: word,
        appid: private_1.appid,
        from: from,
        to: to,
        salt: salt,
        sign: sign
    });
    var options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    var https = require('https');
    var request = https.request(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        });
        response.on('end', function () {
            var string = Buffer.concat(chunks).toString();
            var object = JSON.parse(string);
            if (object.error_code) {
                console.error(errorMap[object.error_code] || object.error_msg);
                process.exit(2);
            }
            else {
                console.log(object.trans_result[0].dst);
                process.exit(0);
            }
        });
    });
    request.on('error', function (e) {
        console.error(e);
    });
    request.end();
};
