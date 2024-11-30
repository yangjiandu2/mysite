const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnect')


// 定义数据模型
module.exports = sequelize.define('blogType', {
    // 这张表拥有的字段
    name: {
        type: DataTypes.STRING, // 字符串
        allowNull: false, // 不允许为空
    },
    articleCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})