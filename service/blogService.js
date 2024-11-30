const { validate } = require("validate.js")
const blogTypeModel = require("../dao/model/blogTypeModel")
const { blogRule } = require("../utils/dataRule")
const { ValdationError } = require("../utils/errors")
const { addBlogDao, findBlogByPageDao } = require("../dao/blogDao")
const { addBlogToType } = require("../dao/blogTypeDao")
const { formatResponse, formatDataPattern } = require("../utils/tool")

// 拓展验证规则
validate.validators.categoryIdIsExist = async function (value) {
    const blogTypeInfo = blogTypeModel.findByPk(value)
    if (blogTypeInfo) {
        return
    }
    return "CategoryId Is Not Exist"
}

module.exports.addBlogService = async function (newBlogInfo) {
    // 首先第一个要处理的就是TOC 

    // 接下来 我们将处理好的TOC格式转换为字符串
    newBlogInfo.toc = JSON.stringify(newBlogInfo.toc)
    // 初始化文章其他信息
    newBlogInfo.scanNumber = 0 // 阅读量初始化为零
    newBlogInfo.commentNumber = 0 // 评论数初始化为零

    // 对传递过来的数据进行下一步验证
    try {
        // 因为拓展的验证规则里面涉及到了异步操作 所以这里要采用异步的验证方式
        await validate.async(newBlogInfo, blogRule)
        const data = await addBlogDao(newBlogInfo) // 新增操作
        // 文章新增了 对应的文章分类也应该新增
        await addBlogToType(newBlogInfo.categoryId)
        return formatResponse(0, '', data)
    } catch (e) {
        // 验证不通过
        throw new ValdationError("数据验证失败")
    }
}

module.exports.findBlogByPageSerive = async function (pageInfo) {
    const data = await findBlogByPageDao(pageInfo)
    const rows = formatDataPattern(data.rows)
    // 针对toc 做一个数据还原操作
    rows.forEach(item => {
        item.toc = JSON.parse(item.toc)
    })
    return formatResponse(0, "", {
        total: data.count,
        rows: rows
    })
}   