const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('yuan', 'root', '123456', {
  host: '192.168.99.100',
  dialect: 'mysql'
});

// 创建user 模型
class User extends Model { }
// 初始化user
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });


async function run () {
  User.destroy({
    where: {
      id: 1
    }
  })
  const users = await User.findAll();
  console.log("all users:", JSON.stringify(users, null, 2));
  sequelize.close();
}

run()

// 同步数据库
// sequelize.sync()
//   .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   }))
//   .then(jane => {
//     console.log('jane', jane.toJSON());
//   })