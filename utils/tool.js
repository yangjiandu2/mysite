const jwt = require('jsonwebtoken')
const md5 = require("md5")
const multer = require("multer")
const path = require('path')

module.exports.formatResponse = function (code, msg, data) {
    return {
        "code": code,
        "msg": msg,
        "data": data
    }
}

// 解析token
module.exports.analysisToken = function (token) {
    return jwt.verify(token.split(" ")[1].toString(), md5(process.env.JWT_SECRET))
}


// 解析数组类型相应数据
module.exports.formatDataPattern = function (data) {
    const arr = []
    for (const i of data) {
        arr.push(i.dataValues)
    }
    return arr
}

// 设置上传文件的引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 文件存储位置
        cb(null, __dirname + '/../public/static/uploads')
    },
    // 上传到服务器的文件，文件名要单独做处理
    filename: function (req, file, cb) {
        // 获取后缀名
        const extname = path.extname(file.originalname)
        // 获取文件名
        const baseName = path.basename(file.originalname, extname)
        // 构建新的名字 
        const newName = baseName + new Date().getTime() + Math.floor(Math.random() * 9000 + 10) + extname
        cb(null, newName)
    }
})


module.exports.uploading = multer({
    storage: storage,
    limits: {
        fileSize: 2000000, // 在 multipart 表单中，文件最大长度 (字节单位)
        files: 1, // 在 multipart 表单中，文件最大数量
    }
})