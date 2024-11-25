// 这一层负责和数据库打交道

const { where } = require('sequelize')
const adminModel = require('./model/adminModel')

// 登录
module.exports.loginDao = async function (loginInfo) {
    const { loginId, loginPwd } = loginInfo
    // 接下来就是进行数据库查询
    return await adminModel.findOne({
        where: {
            loginId,
            loginPwd
        }
    })
}

module.exports.updateAdminDao = async function(newAccountInfo){
   return await adminModel.update(newAccountInfo,{
        where:{
            loginId:newAccountInfo.loginId
        }
    })
}