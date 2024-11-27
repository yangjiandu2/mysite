// 该文件对数据库进行初始化操作
const md5 = require('md5')
const sequelize = require('./dbConnect') // 数据库链接实例

const adminModel = require('./model/adminModel') // 数据库模型
const bannerModel = require('./model/bannerModel')

async function init() {
    // 将数据模型和表进行同步
    await sequelize.sync({
        alter: true
    })

    // 同步完成后，有一些表是需要初始化数据
    // 我们需要先查询这张表有没有内容.没有内容我们才开始初始化数据
    const adminCount = await adminModel.count()

    // 该表没有数据 进行初始化
    if (!adminCount) {
        await adminModel.create({
            loginId: 'admin',
            name: '超级管理员',
            loginPwd: md5('111')
        })
        console.log('初始化管理员数据完毕')

    }


    // banner 进行初始化操作
    const bannerCount = await bannerModel.count()
    // 该表没有数据 进行初始化
    if (!bannerCount) {
        await bannerModel.bulkCreate([{
            minImg: '/static/images/IMG_7042.JPG',
            bigImg: '/static/images/IMG_7063.JPG',
            title: '纪念自己',
            description: '自由在路上'
        }])
        console.log('初始化banner数据完毕')

    }
    console.log('初始化数据完毕')
}

init()