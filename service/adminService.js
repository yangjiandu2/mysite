// admin 模块业务逻辑层

const md5 = require("md5")
const jwt = require('jsonwebtoken')
const { ValdationError } = require("../utils/errors")

const { loginDao, updateAdminDao } = require('../dao/adminDao')
const { formatResponse } = require("../utils/tool")

// 登录
module.exports.loginService = async function (loginInfo) {
    loginInfo.loginPwd = md5(loginInfo.loginPwd) // 进行加密

    // 接下来进行数据验证，也就是查询该条数据在数据库里面有没有
    let data = await loginDao(loginInfo)
    if (data && data.dataValues) {
        // 添加 token
        data = {
            id: data.dataValues.id,
            loginId: data.dataValues.loginId,
            name: data.dataValues.name,
        }
        let loginPeriod = null // 时长
        if (loginInfo.remember) {
            // 如果用户勾选了登录七天，remember是有值将值赋值给loginPeriod
            loginPeriod = parseInt(loginInfo.remember) // 转成数字
        } else {
            // 否则默认时长为1天
            loginPeriod = 1;
        }

        // 生成token
        const token = jwt.sign(data, md5(process.env.JWT_SECRET)/*密钥*/, { expiresIn: 60 * 60 * 24 * loginPeriod }/*token时效*/)
        return {
            token,
            data
        }
    }
    return { data }

}

// 更新
module.exports.updateAdminService = async function (accountInfo) {
    // 根据传入的账号查询对应的用户（注意 使用旧密码）
    let adminInfo = await loginDao({ loginId: accountInfo.loginId, loginPwd: md5(accountInfo.oldLoginPwd) })

    // 2.有用户信息/无信息
    if (adminInfo && adminInfo.dataValues) {
        // 更新数据
        const newPassword = md5(accountInfo.loginPwd)
        await updateAdminDao({
            name: accountInfo.name,
            loginId: accountInfo.loginId,
            loginPwd: newPassword
        })
        return formatResponse(0,'',{
            loginId:accountInfo.loginId,
            name:accountInfo.name,
            id:adminInfo.dataValues.id
        })

    } else {
        // 账号/密码输入不正确,抛出自定义错误
        throw new ValdationError("账号或密码输入不正确")
    }
}