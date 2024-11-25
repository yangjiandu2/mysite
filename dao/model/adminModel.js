const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnect')


// 定义数据模型
module.exports = sequelize.define('admin',{
    // 这张表拥有的字段
    loginId:{
        type:DataTypes.STRING,
        allowNull:Boolean,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:Boolean,
    },
    loginPwd:{
        type:DataTypes.STRING,
        allowNull:Boolean,
    }
},{
    freezeTableName:true,
    createdAt:false,
    updatedAt:false
})