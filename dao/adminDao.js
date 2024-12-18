// 这一层负责和数据库打交道

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

// 更新管理员信息
module.exports.updateAdminDao = async function(newAccountInfo){
   return await adminModel.update(newAccountInfo,{
        where:{
            loginId:newAccountInfo.loginId
        }
    })
}