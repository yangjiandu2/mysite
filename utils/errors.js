// 捕获错误 抛出自定义的错误信息

const { formatResponse } = require("./tool");

/**
 * 业务处理错误类
 */
class ServicerError extends Error{
   /**
    * 
    * @param {*} message 错误信息
    * @param {*} code 错误的消息码
    */
    constructor(message,code){
        super(message);
        this.code = code
    }

    // 格式化返回错误信息
    toResponseJSON(){
        return formatResponse(this.code,this.message,null)
    }
}


// 文件上传错误

exports.UploadError = class extends ServicerError{
    constructor(message){
        super(message,413)
    }
}

// 禁止访问错误

exports.ForbiddenError = class extends ServicerError{
    constructor(message){
        super(message,401)
    }
}

// 验证错误

exports.ValdationError = class extends ServicerError{
    constructor(message){
        super(message,406)
    }
}

// 无资源错误
exports.NotFoundError = class extends ServicerError{
    constructor(){
        super('not found',401)
    }
}

// 未知错误
exports.UnknownError = class extends ServicerError{
    constructor(){
        super('server internal error',500)
    }
}


module.exports.ServicerError