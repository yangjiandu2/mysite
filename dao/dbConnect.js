// 该文件复制链接数据库
const { Sequelize } = require('sequelize');

// 链接数据库
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect:'mysql', 
    logging:false, // 设置false 生成的sql语句不会在控制台显示
  }); 

  // 测试数据库链接是否有问题
(async function(){
    try { 
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })()

  // 向外暴露连接实例
  module.exports = sequelize