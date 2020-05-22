var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '192.168.99.100',
  user: 'root',
  password: '123456'
});

connection.connect();
// CREATE TABLE IF NOT EXISTS user CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
connection.query('CREATE DATABASE IF NOT EXISTS yuan DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_520_ci;', function (error, results, fields) {
  if (error) throw error;
  console.log('创建数据库: ', results);
});

connection.query('use yuan;')
connection.query(`CREATE TABLE IF NOT EXISTS user(
  name text,
  age  int
)`, function (error, results, fields) {
  if (error) throw error;
  console.log('创建表: ', results);
});

connection.end();