// 格式化要相应的数据
// {
//     code:xx,
//     msg:xxx,
//     data:{}
// }

const jwt = require('jsonwebtoken')
const md5 = require("md5")

module.exports.formatResponse = function(code,msg,data){
    return {
        "code":code,
        "msg":msg,
        "data":data
    }
}

module.exports.analysisToken = function(token){
    return jwt.verify(token.split(" ")[1].toString(),md5(process.env.JWT_SECRET))
}   
