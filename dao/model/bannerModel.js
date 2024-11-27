const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnect')


// 定义数据模型
module.exports = sequelize.define('banner', {
    // 这张表拥有的字段
    minImg: {
        type: DataTypes.STRING, // 字符串
        allowNull: false, // 不允许为空
    },
    bigImg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})