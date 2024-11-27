const jwt = require('jsonwebtoken')
const md5 = require("md5")

module.exports.formatResponse = function(code,msg,data){
    return {
        "code":code,
        "msg":msg,
        "data":data
    }
}

// 解析token
module.exports.analysisToken = function(token){
    return jwt.verify(token.split(" ")[1].toString(),md5(process.env.JWT_SECRET))
}   


// 解析数组类型相应数据
module.exports.formatDataPattern = function(data){
    const arr = []
    for(const i of data){
        arr.push(i.dataValues)
    }
    return arr
}

