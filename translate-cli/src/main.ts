import * as querystring from 'querystring';
import md5 = require('md5');
import { appid, appSecret } from './private';

type errorMap = {
  [x: string]: string;
};
const errorMap: errorMap = {
  52003: '用户认证失败',
  52004: 'error2',
  unknown: 'error555'
};

export const translate = (word: string) => {
  const salt = Math.random();
  const sign = md5(appid + word + salt + appSecret);
  let from, to;

  if (/[a-zA-Z]/.test(word[0])) {
    //英 -> 中
    from = 'en';
    to = 'zh';
  } else {
    // 中 -> 英
    to = 'en';
    from = 'zh';
  }

  const query: string = querystring.stringify({
    q: word,
    appid: appid,
    from,
    to,
    salt,
    sign
  });

  const options = {
    hostname: 'fanyi-api.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };
  const https = require('https');
  const request = https.request(options, (response: any) => {
    let chunks: Buffer[] = [];
    response.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    response.on('end', () => {
      const string = Buffer.concat(chunks).toString();
      type BaiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: {
          src: string;
          dst: string;
        }[];
      };
      const object: BaiduResult = JSON.parse(string);
      if (object.error_code) {
        console.error(errorMap[object.error_code] || object.error_msg);
        process.exit(2);
      } else {
        console.log(object.trans_result[0].dst);
        process.exit(0);
      }
    });
  });

  request.on('error', (e: any) => {
    console.error(e);
  });
  request.end();
};
