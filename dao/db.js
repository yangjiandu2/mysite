// 该文件对数据库进行初始化操作
const md5 = require('md5')
const sequelize = require('./dbConnect') // 数据库链接实例

const adminModel = require('./model/adminModel') // 数据库模型

async function init(){
    await sequelize.sync({
        alter: true
    })

    // 同步完成后，有一些表是需要初始化数据
    // 我们需要先查询这张表有没有内容.没有内容我们才开始初始化数据
    const adminCount =  await adminModel.count()

    // 该表没有数据 进行初始化
    if(!adminCount){
        await adminModel.create({
            loginId:'admin',
            name:'超级管理员',
            loginPwd:md5('111')
        })
        console.log('初始化管理员数据完毕')

    }
    console.log('初始化数据完毕')
}

init()