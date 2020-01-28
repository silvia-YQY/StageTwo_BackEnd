import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url: path, headers } = request;
    console.log(path);
    const { pathname: pathName, search } = url.parse(path);
    let fileName = pathName.substr(1);
    if (fileName === '') {
        fileName = 'index.html';
    }
    // response.setHeader('Content-Type', 'text/html;charset=utf-8');
    fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
        if (error) {
            if (error.errno === -4058) {
                response.statusCode = 404;
                fs.readFile(
                    p.resolve(publicDir, '404/index.html'),
                    (err, data) => {
                        response.end(data);
                    }
                );
            } else {
                response.statusCode = 500;
                response.end('服务器繁忙');
            }
        } else {
            response.end(data);
        }
    });
});

server.listen(8888, () => {
    console.log('来自于', server.address());
});
