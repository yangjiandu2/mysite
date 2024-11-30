const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnect')


// 定义数据模型
module.exports = sequelize.define('blog', {
    // 这张表拥有的字段
    title: {
        type: DataTypes.STRING, // 字符串
        allowNull: false, // 不允许为空
    },
    description: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    htmlContent: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    toc:{
        type: DataTypes.TEXT,
        allowNull: false,  
    },
    thumb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scanNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    commentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})